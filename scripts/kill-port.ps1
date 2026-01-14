# Script para matar procesos en un puerto específico
param(
    [Parameter(Mandatory=$false)]
    [int]$Port = 8080
)

Write-Host "Checking for processes on port $Port..." -ForegroundColor Yellow

# Función para obtener PIDs de procesos en el puerto
function Get-ProcessIdsOnPort {
    param([int]$PortNumber)
    
    $connections = netstat -ano | Select-String ":$PortNumber.*LISTENING"
    $processIds = @()
    
    foreach ($connection in $connections) {
        $parts = $connection.Line -split '\s+'
        $processId = $parts[-1]
        if ($processId -and $processId -match '^\d+$' -and $processId -ne "0") {
            $processIds += [int]$processId
        }
    }
    
    return $processIds | Select-Object -Unique
}

# Obtener PIDs
$processIds = Get-ProcessIdsOnPort -PortNumber $Port

if ($processIds.Count -gt 0) {
    Write-Host "Found $($processIds.Count) process(es) on port $Port" -ForegroundColor Yellow
    
    foreach ($processId in $processIds) {
        try {
            $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
            if ($process) {
                Write-Host "Killing process: $($process.ProcessName) (PID: $processId)" -ForegroundColor Red
                Stop-Process -Id $processId -Force -ErrorAction Stop
                Write-Host "Process $processId terminated successfully" -ForegroundColor Green
            }
        } catch {
            $errorMsg = $_.Exception.Message
            Write-Host "Could not kill process $processId : $errorMsg" -ForegroundColor Red
            # Intentar con taskkill como respaldo
            try {
                $result = taskkill /PID $processId /F 2>&1
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "Process $processId terminated using taskkill" -ForegroundColor Green
                }
            } catch {
                Write-Host "Failed to kill process $processId" -ForegroundColor Red
            }
        }
    }
    
    # Esperar a que el puerto se libere completamente
    $maxAttempts = 10
    $attempt = 0
    $portStillInUse = $true
    
    while ($portStillInUse -and $attempt -lt $maxAttempts) {
        Start-Sleep -Milliseconds 500
        $remainingProcessIds = Get-ProcessIdsOnPort -PortNumber $Port
        if ($remainingProcessIds.Count -eq 0) {
            $portStillInUse = $false
        }
        $attempt++
    }
    
    if ($portStillInUse) {
        Write-Host "Warning: Port $Port may still be in use" -ForegroundColor Yellow
    } else {
        Write-Host "Port $Port is now free!" -ForegroundColor Green
    }
} else {
    Write-Host "No processes found on port $Port" -ForegroundColor Green
}
