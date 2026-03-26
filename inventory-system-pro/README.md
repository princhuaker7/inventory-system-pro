# 🚀 Inventory System PRO

Aplicación web de gestión de inventario desarrollada como proyecto de portafolio para demostrar habilidades full stack.

## 🧠 Descripción

Este sistema permite administrar productos mediante operaciones CRUD completas:

- Crear productos
- Listar productos
- Editar productos
- Eliminar productos
- Buscar productos por nombre

También muestra una alerta visual cuando el stock es bajo.

## ⚙️ Tecnologías

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL

### Frontend
- HTML
- CSS
- JavaScript

## 📁 Estructura del proyecto

- `backend/` API REST con Spring Boot
- `frontend/` interfaz web
- `screenshots/` capturas del sistema

## ▶️ Cómo ejecutar

### 1. Crear la base de datos en MySQL

```sql
CREATE DATABASE inventory_db;
```

### 2. Configurar credenciales

Editar el archivo:

```properties
backend/src/main/resources/application.properties
```

y cambiar:

```properties
spring.datasource.username=root
spring.datasource.password=1234
```

por tus datos reales.

### 3. Ejecutar el backend

```bash
cd backend
mvn spring-boot:run
```

### 4. Abrir el frontend

Abrir en el navegador:

```bash
frontend/index.html
```

## 🎯 Objetivo

Proyecto creado para portafolio profesional y postulaciones a práctica o cargo junior de desarrollo.

## 👨‍💻 Autor

Adelain Septembre
- GitHub: https://github.com/princhuaker7
- LinkedIn: https://www.linkedin.com/in/adelain-septembre-2828b03b2
