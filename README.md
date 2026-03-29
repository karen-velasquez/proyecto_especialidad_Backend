# Dog Biometric API

API REST desarrollada con **Node.js y Express** para el sistema de identificación biométrica de perros. Gestiona la autenticación de usuarios, el registro de mascotas y el almacenamiento de imágenes en la nube.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Variables de Entorno](#variables-de-entorno)
- [Endpoints de la API](#endpoints-de-la-api)
- [Modelos de Datos](#modelos-de-datos)

---

## Descripción

**Dog Biometric API** es el backend del sistema de identificación biométrica de mascotas. Provee una API REST que permite:

- Registro y autenticación de propietarios con JWT.
- Registro de perros con foto subida a Cloudinary.
- Consulta y búsqueda de perros por raza.
- Gestión del perfil del usuario.

Se comunica con la aplicación móvil Flutter (`dog_biometric_frontend`) y utiliza MongoDB como base de datos.

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | ≥18.x | Runtime JavaScript |
| Express | 5.2.1 | Framework web |
| MongoDB | — | Base de datos |
| Mongoose | 9.3.0 | ODM para MongoDB |
| JSON Web Token | 9.0.3 | Autenticación |
| bcryptjs | 3.0.3 | Hash de contraseñas |
| Cloudinary | 1.41.3 | Almacenamiento de imágenes |
| Multer | 2.1.1 | Manejo de archivos multipart |
| dotenv | 17.3.1 | Variables de entorno |
| nodemon | 3.1.14 | Recarga automática en desarrollo |

---

## Arquitectura

El proyecto sigue principios de **Clean Architecture** con separación clara de capas:

```
┌──────────────────────────────────────────┐
│          Flutter Mobile App              │
└─────────────────┬────────────────────────┘
                  │ HTTP REST (puerto 3000)
┌─────────────────▼────────────────────────┐
│           Routes (Express)               │
│  /api/auth   /api/users   /api/dogs      │
├──────────────────────────────────────────┤
│              Controllers                  │
│  (Manejan req/res, delegan a servicios)  │
├──────────────────────────────────────────┤
│               Services                   │
│      (Lógica de negocio)                 │
├──────────────────────────────────────────┤
│             Repositories                 │
│      (Acceso a datos - Mongoose)         │
├──────────────────────────────────────────┤
│               Models                     │
│      (Esquemas MongoDB)                  │
└─────────────┬──────────────┬─────────────┘
              │              │
         MongoDB         Cloudinary
         (Local)       (Cloud Storage)
```

---

## Estructura del Proyecto

```
dog_biometric_api/
├── src/
│   ├── server.js                  # Punto de entrada del servidor
│   ├── app.js                     # Configuración de Express
│   │
│   ├── config/
│   │   └── cloudinary.js          # Configuración de Cloudinary + Multer
│   │
│   ├── controllers/
│   │   ├── auth.controller.js     # Controlador de autenticación
│   │   ├── auth.middleware.js     # Middleware JWT (verificación de token)
│   │   ├── dog.controller.js      # Controlador de perros
│   │   └── user.controller.js     # Controlador de usuarios
│   │
│   ├── routes/
│   │   ├── auth.routes.js         # POST /api/auth/login
│   │   ├── dog.routes.js          # CRUD /api/dogs
│   │   └── user.routes.js         # CRUD /api/users
│   │
│   ├── services/
│   │   ├── auth.service.js        # Lógica de login y JWT
│   │   ├── dog.service.js         # Lógica de negocio de perros
│   │   └── user.service.js        # Lógica de negocio de usuarios
│   │
│   ├── models/
│   │   ├── user.model.js          # Esquema Mongoose de Usuario
│   │   └── dog.model.js           # Esquema Mongoose de Perro
│   │
│   ├── repositories/
│   │   ├── user.repository.js     # Queries MongoDB de usuarios
│   │   └── dog.repository.js      # Queries MongoDB de perros
│   │
│   └── db/
│       └── index.js               # Conexión a MongoDB
│
├── .env                           # Variables de entorno (NO subir al repo)
├── .env.example                   # Plantilla de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

---

## Requisitos Previos

Antes de ejecutar el backend, asegúrate de tener instalado:

1. **Node.js** ≥ 18.x — [nodejs.org](https://nodejs.org)
   ```bash
   node -v   # Verificar versión
   ```

2. **MongoDB** instalado y corriendo localmente
   - [Instalación de MongoDB Community](https://www.mongodb.com/try/download/community)
   - Iniciar servicio: `mongod` (Linux/Mac) o desde Servicios de Windows

3. **Cuenta de Cloudinary** (gratuita)
   - Registrarse en [cloudinary.com](https://cloudinary.com)
   - Obtener: Cloud Name, API Key, API Secret

---

## Instalación y Ejecución

### Paso 1: Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd FRONTEND/dog_biometric_api
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar variables de entorno

Copia el archivo de ejemplo y completa con tus credenciales:

```bash
cp .env.example .env
```

Edita el archivo `.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/dog_biometric
JWT_SECRET=tu_clave_secreta_aqui

CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### Paso 4: Verificar que MongoDB esté corriendo

```bash
# Linux/Mac
sudo systemctl start mongod

# Windows (en PowerShell como Administrador)
net start MongoDB
```

### Paso 5: Ejecutar el servidor

```bash
# Modo desarrollo (con recarga automática)
npm run dev

# El servidor estará disponible en:
# http://localhost:3000
```

Deberías ver en la consola:
```
Server running on port 3000
Connected to MongoDB
```

---

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `PORT` | Puerto del servidor | `3000` |
| `MONGO_URI` | URL de conexión a MongoDB | `mongodb://localhost:27017/dog_biometric` |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | `mi_clave_super_secreta` |
| `CLOUDINARY_CLOUD_NAME` | Nombre del cloud de Cloudinary | `mi_cloud` |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary | `123456789` |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary | `abc123xyz` |

> **Importante:** Nunca subas el archivo `.env` al repositorio. Ya está incluido en `.gitignore`.

---

## Endpoints de la API

La URL base del servidor es: `http://localhost:3000`

### Autenticación

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `POST` | `/api/auth/login` | Iniciar sesión, retorna JWT | No |

**Body de login:**
```json
{
  "carnet": "1234567",
  "password": "mi_contraseña"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "nombres": "Juan", "email": "..." }
}
```

---

### Usuarios

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `POST` | `/api/users` | Registrar nuevo usuario | No |
| `GET` | `/api/users/me` | Obtener perfil del usuario actual | JWT |
| `PUT` | `/api/users/me` | Actualizar perfil del usuario | JWT |

**Body para registrar usuario:**
```json
{
  "nombres": "Juan",
  "apellidos": "Pérez",
  "carnet": "1234567",
  "fechaNacimiento": "1990-05-15",
  "telefono": "+59170000000",
  "email": "juan@email.com",
  "password": "mi_contraseña"
}
```

---

### Perros

| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| `POST` | `/api/dogs` | Registrar perro (con foto) | JWT |
| `GET` | `/api/dogs` | Listar perros del usuario | JWT |
| `GET` | `/api/dogs/search-by-breed` | Buscar perros por raza | JWT |

**Registrar perro** — `multipart/form-data`:

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | String | Nombre del perro |
| `genero` | String | `macho` o `hembra` |
| `edadAnios` | Number | Años de edad |
| `edadMeses` | Number | Meses adicionales (0-11) |
| `raza` | String | Raza del perro |
| `esterilizado` | Boolean | Si está esterilizado |
| `codigoEsterilizacion` | String | Código de certificado (opcional) |
| `foto` | File | Imagen del perro |
| `razasDetectadas` | JSON String | Array de razas detectadas por ML |

**Buscar por raza:**
```
GET /api/dogs/search-by-breed?raza=Labrador%20Retriever
```

> **Autenticación:** Para endpoints protegidos, incluir el header:
> ```
> Authorization: Bearer <TOKEN_JWT>
> ```

---

## Modelos de Datos

### Usuario (User)

```
nombres           String    Requerido
apellidos         String    Requerido
carnet            String    Único, requerido
fechaNacimiento   Date      Requerido
telefono          String    Requerido
email             String    Único, opcional
password          String    Requerido (almacenado con hash bcrypt)
role              String    Default: "user"
createdAt         Date      Auto
updatedAt         Date      Auto
```

### Perro (Dog)

```
nombre                String    Requerido
genero                String    "macho" | "hembra"
edadAnios             Number    Default: 0
edadMeses             Number    0-11, Default: 0
raza                  String    Enum de 36 razas
esterilizado          Boolean   Requerido
codigoEsterilizacion  String    Opcional
owner                 ObjectId  Referencia al Usuario
foto                  String    URL de Cloudinary
biometricPatterns     [String]  Patrones biométricos
razasDetectadas       [{raza, confianza}]  Razas detectadas por ML
createdAt             Date      Auto
updatedAt             Date      Auto
```

---

## Pruebas de la API

Se puede probar con **Postman** o **Insomnia**. Pasos básicos:

1. Crear usuario: `POST /api/users`
2. Hacer login: `POST /api/auth/login` → copiar token
3. Usar el token en el header `Authorization: Bearer <token>` para el resto de requests

---

## Autor

Proyecto de fin de especialidad — Sistema de Identificación Biométrica de Mascotas.
