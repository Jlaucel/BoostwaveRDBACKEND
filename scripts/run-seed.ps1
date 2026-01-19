# Script PowerShell para ejecutar el seed de datos de prueba
# Uso: .\scripts\run-seed.ps1

$mysqlHost = "gondola.proxy.rlwy.net"
$mysqlPort = "33485"
$mysqlUser = "root"
$mysqlPassword = "tnjOQcsfIhDPxMOaSeXSuBKWXMWxylVE"
$mysqlDatabase = "railway"
$sqlFile = "migrations\seed_test_data.sql"

Write-Host "🌱 Ejecutando seed de datos de prueba..." -ForegroundColor Green
Write-Host "📁 Archivo SQL: $sqlFile" -ForegroundColor Cyan

# Verificar que el archivo existe
if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ Error: No se encontró el archivo $sqlFile" -ForegroundColor Red
    exit 1
}

# Construir el comando mysql
$mysqlCommand = "mysql -h $mysqlHost -u $mysqlUser -p$mysqlPassword --port $mysqlPort --protocol=TCP $mysqlDatabase"

try {
    # Leer el contenido del archivo SQL y pasarlo a mysql
    Get-Content $sqlFile -Raw | & mysql -h $mysqlHost -u $mysqlUser -p$mysqlPassword --port $mysqlPort --protocol=TCP $mysqlDatabase
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Seed ejecutado exitosamente!" -ForegroundColor Green
    } else {
        Write-Host "❌ Error al ejecutar el seed. Código de salida: $LASTEXITCODE" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Alternativa manual:" -ForegroundColor Yellow
    Write-Host "   mysql -h $mysqlHost -u $mysqlUser -p --port $mysqlPort --protocol=TCP $mysqlDatabase" -ForegroundColor Cyan
    Write-Host "   Luego copia y pega el contenido de $sqlFile" -ForegroundColor Cyan
    exit 1
}
