# Guía de Pruebas Postman - BoostWave CRM API

## Base URL
```
http://localhost:8080
```

## Endpoints Disponibles

### 📋 Módulo Company (Empresas)

#### 1. **GET** - Listar todas las empresas (con paginación)
```
GET http://localhost:8080/company
```

**Query Parameters (opcionales):**
- `page` - Número de página (default: 1)
- `limit` - Items por página (default: 10, max: 100)
- `search` - Búsqueda de texto (busca en name y rnc)
- `sortBy` - Campo para ordenar (ej: name, createdAt)
- `sortOrder` - ASC o DESC (default: DESC)
- `filters` - Objeto JSON con filtros adicionales

**Ejemplos de URLs:**
```
GET http://localhost:8080/company
GET http://localhost:8080/company?page=1&limit=5
GET http://localhost:8080/company?search=test
GET http://localhost:8080/company?sortBy=name&sortOrder=ASC
GET http://localhost:8080/company?page=1&limit=10&search=tech&sortBy=createdAt&sortOrder=DESC
```

**Respuesta esperada (con paginación):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Empresa Ejemplo",
      "rnc": "123456789",
      "address": "Calle Principal 123",
      "phone": "809-555-1234",
      "logoUrl": "https://example.com/logo.png",
      "createdAt": "2026-01-13T18:00:00.000Z",
      "updatedAt": "2026-01-13T18:00:00.000Z",
      "deletedAt": null
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

---

#### 2. **GET** - Obtener empresa por ID
```
GET http://localhost:8080/company/:id
```

**Ejemplo:**
```
GET http://localhost:8080/company/1
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "name": "Empresa Ejemplo",
  "rnc": "123456789",
  "address": "Calle Principal 123",
  "phone": "809-555-1234",
  "logoUrl": "https://example.com/logo.png",
  "createdAt": "2026-01-13T18:00:00.000Z",
  "updatedAt": "2026-01-13T18:00:00.000Z",
  "deletedAt": null
}
```

---

#### 3. **POST** - Crear nueva empresa
```
POST http://localhost:8080/company
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Nueva Empresa SRL",
  "rnc": "987654321",
  "address": "Avenida Principal 456",
  "phone": "809-555-5678",
  "logoUrl": "https://example.com/new-logo.png"
}
```

**Body mínimo requerido:**
```json
{
  "name": "Empresa Mínima"
}
```

**Respuesta esperada (201 Created):**
```json
{
  "id": 2,
  "name": "Nueva Empresa SRL",
  "rnc": "987654321",
  "address": "Avenida Principal 456",
  "phone": "809-555-5678",
  "logoUrl": "https://example.com/new-logo.png",
  "createdAt": "2026-01-13T19:00:00.000Z",
  "updatedAt": "2026-01-13T19:00:00.000Z",
  "deletedAt": null
}
```

---

#### 4. **PUT** - Actualizar empresa
```
PUT http://localhost:8080/company/:id
Content-Type: application/json
```

**Ejemplo:**
```
PUT http://localhost:8080/company/1
```

**Body (JSON) - Solo campos a actualizar:**
```json
{
  "name": "Empresa Actualizada",
  "phone": "809-555-9999",
  "address": "Nueva Dirección 789"
}
```

**Respuesta esperada (200 OK):**
```json
{
  "id": 1,
  "name": "Empresa Actualizada",
  "rnc": "123456789",
  "address": "Nueva Dirección 789",
  "phone": "809-555-9999",
  "logoUrl": "https://example.com/logo.png",
  "createdAt": "2026-01-13T18:00:00.000Z",
  "updatedAt": "2026-01-13T19:30:00.000Z",
  "deletedAt": null
}
```

---

#### 5. **DELETE** - Soft delete empresa
```
DELETE http://localhost:8080/company/:id
```

**Ejemplo:**
```
DELETE http://localhost:8080/company/1
```

**Respuesta esperada (204 No Content):**
```
(Sin cuerpo de respuesta)
```

**Nota:** La empresa no se elimina físicamente, solo se marca como eliminada (`deletedAt` se establece). No aparecerá en las búsquedas normales.

---

#### 6. **POST** - Restaurar empresa eliminada
```
POST http://localhost:8080/company/:id/restore
```

**Ejemplo:**
```
POST http://localhost:8080/company/1/restore
```

**Respuesta esperada (200 OK):**
```json
{
  "id": 1,
  "name": "Empresa Restaurada",
  "rnc": "123456789",
  "address": "Calle Principal 123",
  "phone": "809-555-1234",
  "logoUrl": "https://example.com/logo.png",
  "createdAt": "2026-01-13T18:00:00.000Z",
  "updatedAt": "2026-01-13T20:00:00.000Z",
  "deletedAt": null
}
```

---

## 🧪 Colección de Pruebas Postman

### Prueba 1: Crear una empresa
1. **Método:** POST
2. **URL:** `http://localhost:8080/company`
3. **Headers:** 
   - `Content-Type: application/json`
4. **Body:**
```json
{
  "name": "Tech Solutions RD",
  "rnc": "131123456",
  "address": "Av. Winston Churchill, Santo Domingo",
  "phone": "809-555-0100",
  "logoUrl": "https://example.com/tech-logo.png"
}
```

---

### Prueba 2: Listar todas las empresas
1. **Método:** GET
2. **URL:** `http://localhost:8080/company`

---

### Prueba 3: Buscar empresas por nombre
1. **Método:** GET
2. **URL:** `http://localhost:8080/company?search=Tech`

---

### Prueba 4: Listar con paginación
1. **Método:** GET
2. **URL:** `http://localhost:8080/company?page=1&limit=5`

---

### Prueba 5: Obtener empresa específica
1. **Método:** GET
2. **URL:** `http://localhost:8080/company/1`
   *(Reemplaza 1 con el ID de una empresa existente)*

---

### Prueba 6: Actualizar empresa
1. **Método:** PUT
2. **URL:** `http://localhost:8080/company/1`
   *(Reemplaza 1 con el ID de una empresa existente)*
3. **Headers:** 
   - `Content-Type: application/json`
4. **Body:**
```json
{
  "phone": "809-555-9999",
  "address": "Nueva Dirección Actualizada"
}
```

---

### Prueba 7: Ordenar por nombre ascendente
1. **Método:** GET
2. **URL:** `http://localhost:8080/company?sortBy=name&sortOrder=ASC`

---

### Prueba 8: Filtrar y ordenar
1. **Método:** GET
2. **URL:** `http://localhost:8080/company?page=1&limit=10&search=Solutions&sortBy=createdAt&sortOrder=DESC`

---

### Prueba 9: Soft delete empresa
1. **Método:** DELETE
2. **URL:** `http://localhost:8080/company/1`
   *(Reemplaza 1 con el ID de una empresa existente)*

---

### Prueba 10: Restaurar empresa eliminada
1. **Método:** POST
2. **URL:** `http://localhost:8080/company/1/restore`
   *(Reemplaza 1 con el ID de una empresa eliminada)*

---

## 📝 Códigos de Estado HTTP

- **200 OK** - Operación exitosa (GET, PUT, POST restore)
- **201 Created** - Recurso creado exitosamente (POST create)
- **204 No Content** - Eliminación exitosa (DELETE)
- **400 Bad Request** - Datos inválidos
- **404 Not Found** - Recurso no encontrado
- **500 Internal Server Error** - Error del servidor

---

## 🔍 Validaciones

### Crear Empresa (POST):
- ✅ `name` es **requerido** y debe ser string
- ✅ `rnc` es opcional pero debe ser único si se proporciona
- ✅ `name` debe ser único
- ✅ `address`, `phone`, `logoUrl` son opcionales

### Actualizar Empresa (PUT):
- ✅ Todos los campos son opcionales
- ✅ Solo se actualizan los campos proporcionados
- ✅ `name` y `rnc` deben seguir siendo únicos si se actualizan

---

## 🚀 Importar en Postman

1. Abre Postman
2. Crea una nueva colección llamada "BoostWave CRM"
3. Crea las requests según los ejemplos anteriores
4. O usa el botón "Import" y pega esta URL si tienes la colección en formato JSON

---

## 💡 Tips para Pruebas

1. **Variables de Entorno en Postman:**
   - Crea una variable `base_url` = `http://localhost:8080`
   - Usa `{{base_url}}/company` en tus requests

2. **Tests Automáticos:**
   - Agrega tests en Postman para verificar códigos de estado
   - Verifica que la respuesta tenga la estructura esperada

3. **Secuencia Recomendada:**
   1. Crear empresa (POST) → Guarda el ID
   2. Listar empresas (GET)
   3. Obtener empresa específica (GET con ID)
   4. Actualizar empresa (PUT con ID)
   5. Eliminar empresa (DELETE con ID)
   6. Restaurar empresa (POST restore con ID)

---

---

## 👥 Módulo Users (Usuarios)

#### 1. **GET** - Listar todos los usuarios (con paginación)
```
GET http://localhost:8080/users
```

**Query Parameters (opcionales):**
- `page` - Número de página (default: 1)
- `limit` - Items por página (default: 10, max: 100)
- `search` - Búsqueda de texto (busca en username, email, firstName, lastName)
- `sortBy` - Campo para ordenar (ej: username, createdAt)
- `sortOrder` - ASC o DESC (default: DESC)

**Ejemplos:**
```
GET http://localhost:8080/users
GET http://localhost:8080/users?page=1&limit=5
GET http://localhost:8080/users?search=john
GET http://localhost:8080/users?sortBy=username&sortOrder=ASC
```

---

#### 2. **GET** - Obtener usuario por ID
```
GET http://localhost:8080/users/:id
```

**Ejemplo:**
```
GET http://localhost:8080/users/1
```

**Nota:** La contraseña no se incluye en la respuesta.

---

#### 3. **POST** - Crear nuevo usuario
```
POST http://localhost:8080/users
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "companyId": 1,
  "phone": "809-555-1234",
  "profilePictureUrl": "https://example.com/profile.jpg",
  "accessToken": "optional-token"
}
```

**Campos requeridos:**
- `username` (único)
- `firstName`
- `lastName`
- `email`
- `password`
- `companyId`

---

#### 4. **PUT** - Actualizar usuario
```
PUT http://localhost:8080/users/:id
Content-Type: application/json
```

**Body (JSON) - Solo campos a actualizar:**
```json
{
  "firstName": "Jane",
  "phone": "809-555-9999",
  "email": "jane.doe@example.com"
}
```

**Nota:** Si actualizas `password`, se hasheará automáticamente.

---

#### 5. **DELETE** - Soft delete usuario
```
DELETE http://localhost:8080/users/:id
```

---

#### 6. **POST** - Restaurar usuario eliminado
```
POST http://localhost:8080/users/:id/restore
```

---

#### 7. **POST** - Registrar usuario (endpoint legacy)
```
POST http://localhost:8080/users/register
Content-Type: application/json
```

**Body:** Igual que crear usuario

---

#### 8. **GET** - Obtener usuario actual (requiere JWT)
```
GET http://localhost:8080/users/getUser
Authorization: Bearer <JWT_TOKEN>
```

**Headers:**
- `Authorization: Bearer <tu_token_jwt>`

---

## 🧪 Pruebas Adicionales para Users

### Prueba 11: Crear usuario
1. **Método:** POST
2. **URL:** `http://localhost:8080/users`
3. **Headers:** `Content-Type: application/json`
4. **Body:**
```json
{
  "username": "testuser",
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "password": "test123",
  "companyId": 1
}
```

### Prueba 12: Listar usuarios
1. **Método:** GET
2. **URL:** `http://localhost:8080/users`

### Prueba 13: Buscar usuarios
1. **Método:** GET
2. **URL:** `http://localhost:8080/users?search=test`

### Prueba 14: Obtener usuario por ID
1. **Método:** GET
2. **URL:** `http://localhost:8080/users/1`

### Prueba 15: Actualizar usuario
1. **Método:** PUT
2. **URL:** `http://localhost:8080/users/1`
3. **Body:**
```json
{
  "firstName": "Updated Name",
  "phone": "809-555-8888"
}
```

---

## 📚 Documentación Swagger

Accede a la documentación interactiva en:
```
http://localhost:8080/api
```

Aquí podrás ver todos los endpoints, probarlos directamente y ver los esquemas de validación.
