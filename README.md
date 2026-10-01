# Blog Frontend

Frontend de una aplicación de blogs desarrollada con React, TypeScript y Vite. La app combina una vista pública para leer publicaciones con un espacio personal para usuarios autenticados, donde pueden crear, editar y eliminar sus propios posts.

## Descripción del proyecto

Este proyecto es la parte cliente de una plataforma de blogs conectada a un backend en FastAPI. La interfaz permite:

- Ver publicaciones públicas en la home
- Registrarse e iniciar sesión
- Acceder a un panel personal del usuario
- Crear nuevos artículos
- Editar publicaciones propias
- Eliminar publicaciones
- Actualizar la información del perfil
- Administrar usuarios desde una ruta exclusiva para administradores
- Navegar con rutas protegidas según el estado de autenticación y el rol

## Tecnologías utilizadas

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Fetch para consumo de la API
- Variables de entorno con Vite

## Funcionalidades principales

### Vista pública
- Landing page con una presentación estética del blog
- Listado de publicaciones disponibles
- Diseño editorial y minimalista

### Autenticación
- Registro de usuario
- Inicio de sesión
- Gestión de sesión en localStorage
- Rutas protegidas para usuarios autenticados

### Panel del usuario
- Perfil con nombre, usuario y datos básicos
- Edición de nombre, usuario y correo electrónico
- Listado de publicaciones propias
- Estado de la cuenta
- Acceso a crear y editar posts

### Administración de usuarios
- Acceso restringido a usuarios con rol de administrador en `/admin/users`
- Tabla con usuario, nombre completo, correo, rol y estado de cuenta
- Creación de usuarios desde un diálogo con nombre, usuario, correo, contraseña y rol
- Edición de la información, el rol y el estado de usuarios
- Acción para desactivar usuarios

### CRUD de posts
- Crear nueva publicación
- Ver detalle del contenido en un formato limpio
- Editar publicación existente
- Eliminar publicación desde la vista del usuario

## Estructura del proyecto

```text
src/
├── App.tsx
├── main.tsx
├── components/
│   ├── admin/
│   │   ├── create-user.tsx
│   │   ├── update-user.tsx
│   │   └── user-table.tsx
│   ├── blogs/
│   │   ├── create-post.tsx
│   │   ├── edit-post.tsx
│   │   └── post.tsx
│   ├── dialog-wrapper.tsx
│   ├── home-user.tsx
│   ├── login.tsx
│   ├── navbar.tsx
│   ├── register.tsx
│   └── update-profile.tsx
├── context/
│   └── user-context.tsx
├── pages/
│   ├── admin/
│   │   └── user-admin.tsx
│   ├── create-post.tsx
│   ├── edit-post.tsx
│   ├── login.tsx
│   └── register.tsx
├── routes/
│   ├── protected-admin-route.tsx
│   ├── protected-route.tsx
│   └── router.tsx
├── helpers/
│   └── get-access-token.ts
├── types/
│   └── user.ts
└── index.css
```

## Requisitos

- Node.js 18 o superior
- npm o pnpm
- Un backend funcionando con la API de blogs

## Instalación

1. Clona el repositorio
2. Entra a la carpeta del proyecto
3. Instala las dependencias:

```bash
npm install
```

4. Crea un archivo `.env` en la raíz del proyecto con la URL del backend:

```env
VITE_BACKEND_URL=http://localhost:8000
```

> Ajusta la URL según el puerto o dominio donde esté corriendo tu API.

## Scripts disponibles

```bash
npm run dev
```
Inicia el servidor de desarrollo de Vite.

```bash
npm run build
```
Genera la versión de producción del proyecto.

```bash
npm run preview
```
Previsualiza la build generada.

```bash
npm run lint
```
Ejecuta el linter del proyecto.

## Conexión con el backend

La aplicación consume la API usando la variable de entorno:

```env
VITE_BACKEND_URL
```

Las peticiones principales apuntan a rutas como:

- `/posts`
- `/posts/user/:userId`
- `/auth/login`
- `/auth/register`
- `/auth/user/me` para consultar y actualizar el perfil
- `/admin/users` para listar y crear usuarios
- `/admin/users/:userId` para actualizar o desactivar usuarios

La autenticación se realiza con un token JWT guardado en `localStorage` y enviado en el header `Authorization: Bearer ...`.

## Estado de la aplicación

Este proyecto está pensado como un frontend funcional para una plataforma de blogs con autenticación y gestión de contenido. Está preparado para integrarse con un backend REST y ofrece una interfaz moderna, responsiva y orientada a usuarios con edición de contenido.

## Autor

Proyecto desarrollado para una app de blogs con frontend React y backend FastAPI.
