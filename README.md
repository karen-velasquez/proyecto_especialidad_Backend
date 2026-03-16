# 🐶 Dog Nose Biometric Identification API

## Descripción

Este proyecto consiste en el desarrollo de un **backend para un sistema de identificación biométrica de perros mediante la huella nasal**.  
El sistema permite registrar usuarios, registrar perros, capturar imágenes de la nariz del animal y realizar procesos de identificación biométrica utilizando algoritmos de procesamiento de imágenes.

La aplicación forma parte de un sistema **Full Stack**, donde una aplicación móvil desarrollada en **Flutter** se comunica con este backend mediante una **API REST**.

---

# Objetivo general

Desarrollar una **API REST** que permita gestionar usuarios, registrar perros y procesar imágenes biométricas de la nariz para su posterior identificación.

---

# Objetivos específicos

- Implementar una API REST utilizando **Node.js y Express**.
- Gestionar la autenticación de usuarios mediante **JWT**.
- Permitir el registro y consulta de perros dentro del sistema.
- Integrar un servicio de procesamiento biométrico desarrollado en **Python**.
- Almacenar los registros biométricos y datos del sistema en una base de datos.

---

# Alcance

## Incluye

- Registro de usuarios
- Autenticación mediante JWT
- Registro de perros
- Captura y almacenamiento de imágenes biométricas
- Identificación biométrica mediante procesamiento de imágenes
- Integración con backend y base de datos

## No incluye (por ahora)

- Integración con sistemas institucionales externos
- Notificaciones automáticas
- Escalabilidad para producción
- Integración con hardware biométrico especializado

---

# Stack Tecnológico

### Backend

- Node.js
- Express

### Servicio biométrico

- Python
- OpenCV
- PyTorch

### Base de datos

- MongoDB

### Cliente

- Flutter (Aplicación móvil)

### Seguridad

- JWT (JSON Web Token)

### Testing

- Postman

### Control de versiones

- Git
- GitHub

---

# Arquitectura del Sistema

```
Flutter Mobile App
        │
        │ HTTPS / REST API
        ▼
Node.js + Express API
        │
        ├── MongoDB Database
        │
        └── Python Biometric Service
              (OpenCV / PyTorch)
```

---

# Entidades principales

## Users

```
id
name
email
passwordHash
role
createdAt
```

## Dogs

```
id
name
breed
age
ownerId
createdAt
```

## BiometricRecords

```
id
dogId
imagePath
biometricPattern
createdAt
```

---

# Endpoints principales

## Registrar usuario

```
POST /users
```

Body:

```json
{
  "name": "Juan Perez",
  "email": "juan@email.com",
  "password": "123456"
}
```

---

## Login de usuario

```
POST /auth/login
```

Body:

```json
{
  "email": "juan@email.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Registrar perro

```
POST /dogs
```

Body:

```json
{
  "name": "Max",
  "breed": "Labrador",
  "age": 3
}
```

---

## Listar perros

```
GET /dogs
```

Respuesta:

```json
[
  {
    "id": 1,
    "name": "Max",
    "breed": "Labrador",
    "age": 3
  }
]
```

---

## Registrar imagen biométrica

```
POST /biometric-records
```

Body:

```
image: archivo de imagen
dogId: identificador del perro
```

---

## Identificar perro

```
POST /identify
```

Body:

```
image: archivo de imagen
```

Resultado:

```json
{
  "dogId": 1,
  "match": true,
  "confidence": 0.92
}
```

---

# Estructura del Proyecto Backend

```
backend/
│
├── src/
│
│   ├── app.js
│   ├── server.js
│
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── dog.routes.js
│   │   └── biometric.routes.js
│
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── dog.controller.js
│   │   └── biometric.controller.js
│
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── dog.service.js
│   │   └── biometric.service.js
│
│   ├── models/
│   │   ├── user.model.js
│   │   ├── dog.model.js
│   │   └── biometric.model.js
│
│   ├── middlewares/
│   │   └── auth.js
│
│   └── config/
│       └── env.js
│
├── tests/
├── .env.example
├── package.json
└── README.md
```

---

# Cómo ejecutar el proyecto

## 1 Clonar repositorio

```
git clone https://github.com/usuario/dog-biometric-api
```

## 2 Instalar dependencias

```
npm install
```

## 3 Configurar variables de entorno

Crear archivo `.env`

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/dog_biometrics
JWT_SECRET=secret_key
```

## 4 Ejecutar servidor

```
npm run dev
```

---

# Pruebas de la API

Se pueden probar los endpoints utilizando:

- Postman
- Insomnia

---

# Autor

Proyecto desarrollado como parte de la **Maestría en Desarrollo Full Stack**.
