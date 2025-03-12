# Angular Feature-Based Frontend Generator

**Angular Feature-Based Frontend Generator** es una extensión para Visual Studio Code que permite generar automáticamente una estructura en **Angular 19**, basada en una API **Swagger (OpenAPI)** o **GraphQL**, obtenida desde una **URL en lugar de un archivo**.

Esta versión introduce una **arquitectura feature-based**, permitiendo organizar el código en módulos de negocio en lugar de carpetas genéricas. Además, **guarda la última URL utilizada y la muestra al usuario para facilitar modificaciones**.

---

## 🚀 Características

- **Generación automática de código Angular 19** desde una API en **URL**.
- **Soporte para OpenAPI (Swagger) y GraphQL**.
- **Generación de servicios en Angular (`HttpClient`)** con métodos predefinidos según los endpoints.
- **Generación de componentes en Angular** con estructura basada en features.
- **Generación de interfaces TypeScript** para representar los modelos de datos.
- **Selección interactiva** para elegir qué capas generar.
- **Opción de generar la estructura feature-based del proyecto Angular**.
- **Guarda la última URL utilizada y la reutiliza en futuras sesiones, permitiendo su modificación**.

---

## 🛠 Instalación

1. Descarga la extensión desde el [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/).
2. Instala la extensión en VS Code.
3. Reinicia VS Code si es necesario.
4. ¡Listo! Ahora puedes generar código Angular basado en tus APIs.

---

## 📌 Requisitos

- **Visual Studio Code** `1.75.0` o superior.
- **Node.js** y **npm** instalados.
- Proyecto **Angular 19** con estructura **Maven** o **Gradle**.
- Una **URL de API en JSON/YAML (Swagger)** o **GraphQL Schema**.

Si tu proyecto usa **Swagger**, asegúrate de que la API tenga un **endpoint público de OpenAPI**.

---

## 📖 Uso

1. **Ejecuta el comando** `Generate Angular Frontend` desde:
   - La paleta de comandos de VS Code (`Ctrl + Shift + P` o `Cmd + Shift + P` en macOS).
2. **Si ya usaste una API antes**, se reutilizará automáticamente y se mostrará para que puedas modificarla si es necesario.
3. **Si no hay una API guardada**, ingresa la **URL de la API (Swagger o GraphQL)**.
4. **Selecciona qué capas deseas generar**:
   - Servicios en Angular (`HttpClient`).
   - Interfaces TypeScript.
   - Componentes organizados por feature.
5. **Se preguntará si deseas generar la estructura feature-based del proyecto Angular**.
6. **Los archivos generados se almacenarán automáticamente en tu proyecto Angular**.

---

## 📂 Nueva Estructura Generada (Feature-Based)

Si seleccionas la opción de arquitectura **feature-based**, la estructura del código generado será:

```text
src/app/
├── features/
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── services/
│   │   │   ├── users.service.ts
│   │   ├── components/
│   │   │   ├── users-list/
│   │   │   │   ├── users-list.component.ts
│   │   │   │   ├── users-list.component.html
│   │   │   │   ├── users-list.component.scss
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   ├── users-routing.module.ts
│
├── shared/
│   ├── services/
│   │   ├── api.service.ts
│   ├── models/
│   │   ├── base-response.model.ts
```

Si no activas la opción de feature-based, los archivos se generarán en carpetas **genéricas** como `services/`, `components/`, `models/`.

---

## 🔧 Configuración Avanzada

### **Guardar Última API Usada y Permitir Modificaciones**

La extensión recuerda la última **URL de API** que utilizaste y la selecciona automáticamente en futuras sesiones.  
Si deseas modificarla, **se mostrará la URL guardada en el input de VS Code** para que puedas editarla antes de confirmar.

Si dejas el campo vacío, **se reutilizará la última URL utilizada**.

### **Elección del Tipo de API**

Puedes configurar la extensión para seleccionar por defecto un tipo de API:

1. Abre **Configuración** (`Ctrl + ,` o `Cmd + ,` en macOS).
2. Busca `angularGenerator.apiType`.
3. Selecciona `"swagger"` o `"graphql"` según prefieras.

### **Personalización de Plantillas**

La extensión utiliza plantillas predefinidas para generar los archivos Angular. Puedes modificarlas dentro del directorio `templates/` de la extensión.

- **service.template.ts** → Define la estructura de los servicios generados.
- **component.template.ts** → Estructura base de los componentes Angular.
- **model.template.ts** → Define las interfaces TypeScript generadas.

---

## 🛠 Contribuciones

Si encuentras algún problema o tienes sugerencias para mejorar la extensión, abre un [issue en GitHub](https://github.com/nick130920/angular-generator/issues) o envía un pull request.

---

## 📜 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.
