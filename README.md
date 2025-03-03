### Profession Backend

## ✨ Introducción

Este es el backend de Profession, una plataforma diseñada para conectar profesionales independientes con clientes. Este repositorio ha sido publicado para demostrar buenas prácticas de desarrollo y la arquitectura utilizada en el proyecto.

## ⚡ Instalación y Configuración

1. Clonar el repositorio

git clone <URL_DEL_REPOSITORIO>
cd PROFESSION-BE-PUBLIC

2. Instalar dependencias

npm install

3. Configurar variables de entorno

Se debe crear un archivo .env basado en .env.example y configurarlo con los valores correspondientes. Es necesario contar con una base de datos MongoDB en funcionamiento.

4. Ejecutar el servidor

Modo desarrollo

npm run start:dev

Modo producción

npm run start:prod

5. Acceder a la documentación

Una vez iniciado el servidor, la documentación Swagger estará disponible en:

http://localhost:3000/api-docs

## 💻 Tecnologías Utilizadas

Este proyecto usa las siguientes tecnologías y versiones:

Node.js + Express como framework backend

TypeScript para tipado estático y mejor mantenibilidad

Mongoose como ORM para manejar la base de datos MongoDB

Bcrypt para encriptación segura de contraseñas

JSON Web Token (JWT) para autenticación segura

Swagger para documentación de la API

## ⚖ Arquitectura

El proyecto sigue una arquitectura monolítica modular, asegurando alta escalabilidad y mantenibilidad. Se han implementado DTOs y mappers para separar la lógica de validación y presentación de datos, garantizando un código limpio y legible.

## 🚀 Características y Funcionalidades

Autenticación propia utilizando Bcrypt, JWT y lógica en la base de datos para asegurar que solo haya una sesión activa por usuario.

Documentación automática con Swagger.

Middleware personalizado para el manejo de errores.

Middleware de autenticación y permisos por roles.

Sistema de logs personalizados, facilitando la depuración en producción.

CRUDs para usuarios, roles y profesiones.

Manejo de DTOs para separar validaciones de la lógica de negocio.

Uso de mappers con clases para controlar la respuesta de los datos enviados al frontend.

## 🏆 Contribución

Este proyecto ha sido publicado con el objetivo de mostrar habilidades de desarrollo, por lo que no se aceptan contribuciones en esta versión pública.

## 🚀 Contacto

Si estás interesado en mi trabajo, no dudes en contactarme.

¡Gracias por revisar este proyecto! 🚀

victor.agustin.millan@gmail.com
