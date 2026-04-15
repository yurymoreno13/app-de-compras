# 🛍️ App de Compras - React Native (Expo)

Aplicación móvil desarrollada con **React Native y Expo** que permite a los usuarios autenticarse, visualizar productos y crear nuevos productos con carga de imágenes en la nube.

---

## 🚀 Tecnologías utilizadas

* React Native (Expo)
* TypeScript
* Expo Router
* AsyncStorage (persistencia de sesión)
* Fetch API (consumo de backend REST)
* Cloudinary (gestión de imágenes en la nube)
* Node.js (backend externo)

---

## 🔐 Autenticación

La aplicación implementa un sistema completo de autenticación:

* Registro de usuario
* Inicio de sesión
* Persistencia de sesión con token (AsyncStorage)
* Manejo de roles (BUYER / ADMIN)

---

## 📦 Funcionalidades principales

### 🛒 Catálogo de productos

* Visualización de productos desde API
* Agregar productos al carrito
* Visualización de productos creados localmente (modo demo)

---

### ➕ Crear producto

* Nombre
* Precio
* Descripción
* Marca
* Subida de imagen a Cloudinary
* Creación de producto en backend
* Fallback local cuando el usuario no tiene permisos (rol BUYER)

---

### 👤 Perfil

* Visualización de datos del usuario
* Navegación a creación de productos
* Gestión de sesión (logout)
* Control de acceso por rol

---

## ☁️ Gestión de imágenes (Cloudinary)

Las imágenes de los productos son almacenadas y gestionadas mediante **Cloudinary**, un servicio en la nube para manejo de archivos multimedia.

### Funcionalidad implementada:

* Subida de imágenes desde el dispositivo móvil
* Almacenamiento en la nube
* Obtención de URL pública para visualizar imágenes en la app

### Beneficios:

* No se almacenan imágenes en el backend
* Acceso rápido mediante URL
* Escalabilidad y optimización automática de imágenes

---

## ⚠️ Manejo de errores

Se implementaron mecanismos para manejar errores comunes:

* Validación de respuestas vacías (JSON parse error)
* Manejo de errores de autenticación (403 - Forbidden)
* Mensajes claros al usuario
* Creación de productos en modo local cuando el backend restringe acceso

---

## 📱 Diseño UI

* Diseño responsivo para dispositivos móviles
* Uso de SafeAreaView para evitar solapamiento con la barra superior
* Componentes estilizados (inputs, botones, cards)
* Mejora de espaciado y experiencia visual

---

## 🧠 Arquitectura del proyecto

```
app/
 ├── index.tsx (login)
 ├── register.tsx (registro)
 ├── products.tsx (catálogo)
 ├── product-form.tsx (crear producto)
 ├── profile.tsx (perfil)
 ├── cart.tsx (carrito)

services/
 ├── auth.ts
 ├── product-management.ts
 ├── products.ts

utils/
 ├── encryption.ts

constants/
 ├── index.ts
```

---

## ⚙️ Instalación y ejecución

```bash
npm install
npx expo start
```

---

## 🧪 Modo demo

Cuando el usuario tiene rol **BUYER**, no puede crear productos directamente en el backend.

En este caso, la aplicación:

* Simula la creación del producto localmente
* Permite visualizarlo en el catálogo
* Mantiene la experiencia funcional para pruebas


## 🎯 Descripción general

Esta aplicación fue desarrollada como parte de un proyecto académico, implementando buenas prácticas de desarrollo móvil, manejo de estado, consumo de APIs y arquitectura desacoplada.

Se destacan aspectos como:

* Manejo de autenticación
* Persistencia de sesión
* Integración con servicios cloud (Cloudinary)
* Manejo de errores
* Experiencia de usuario

---
