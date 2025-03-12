# Angular Frontend Generator

**Angular Frontend Generator** es una extensión para Visual Studio Code que permite generar automáticamente una estructura en **Angular 19** basada en la documentación de **Swagger (OpenAPI)** o **GraphQL Docs**.

Esta versión ha sido mejorada para permitir:  
✔ **Guardar la última API utilizada** (Swagger o GraphQL).  
✔ **Seleccionar automáticamente la API anterior o pedir una nueva**.  
✔ **Generar opcionalmente la estructura estándar de un proyecto Angular**.  
✔ **Generar servicios, componentes e interfaces en Angular 19**.  

---

## 🚀 Características

- **Generación automática de código en Angular 19** desde Swagger o GraphQL.
- **Soporte para OpenAPI (Swagger) y GraphQL**.
- **Generación de servicios en Angular (`HttpClient`)** con métodos predefinidos según los endpoints.
- **Generación de componentes en Angular** con estructura básica.
- **Generación de interfaces TypeScript** basadas en los modelos extraídos.
- **Selección interactiva** para elegir qué capas generar.
- **Opción de generar la estructura estándar de un proyecto Angular**.
- **Manejo de errores mejorado** y validaciones de archivos de API.
- **Guarda la última API utilizada y la reutiliza en futuras sesiones**.

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
- Un archivo de API en **JSON/YAML (Swagger)** o **GraphQL Schema (.graphql)**.

Si tu proyecto usa **Swagger**, asegúrate de tener el archivo **OpenAPI.json** generado correctamente.

---

## 📖 Uso

1. **Ejecuta el comando** `Generate Angular Frontend` desde:
   - El menú contextual del explorador de archivos (clic derecho sobre el archivo de API).
   - La paleta de comandos de VS Code (`Ctrl + Shift + P` o `Cmd + Shift + P` en macOS).
2. **La extensión verificará si hay una API guardada:**  
   - Si existe, la usará automáticamente.  
   - Si no, te pedirá seleccionar un archivo de API (Swagger o GraphQL).
3. **Selecciona el tipo de API** si no hay una guardada:
   - **Swagger (OpenAPI)** o **GraphQL**.
4. **Selecciona los componentes a generar**:
   - Servicios en Angular (`HttpClient`).
   - Interfaces TypeScript.
   - Componentes con estructura base.
5. **Se preguntará si deseas generar la estructura estándar del proyecto Angular**.
6. **Los archivos generados se almacenarán automáticamente en tu proyecto Angular**.

---

## 📂 Estructura Generada

Dependiendo de la API, la extensión generará la siguiente estructura en Angular:

```text
src/app/
├── services/
│   ├── user.service.ts  # Servicio generado desde Swagger/GraphQL
│   ├── product.service.ts
│
├── components/
│   ├── user/
│   │   ├── user.component.ts
│   │   ├── user.component.html
│   │   ├── user.component.scss
│
├── models/
│   ├── user.model.ts  # Interfaz TypeScript generada
│   ├── product.model.ts
```

Si seleccionas **"Sí"** en la opción de generar la estructura base, se creará lo siguiente:

```text
src/app/
├── components/
├── services/
├── models/
├── shared/
├── assets/
├── environments/
```

---

## 🔧 Configuración Avanzada

### **Selección del Tipo de API**

Puedes configurar la extensión para seleccionar por defecto un tipo de API:

1. Abre **Configuración** (`Ctrl + ,` o `Cmd + ,` en macOS).
2. Busca `angularGenerator.apiType`.
3. Selecciona `"swagger"` o `"graphql"` según prefieras.

### **Personalización de Plantillas**

La extensión utiliza plantillas predefinidas para generar los archivos Angular. Puedes modificarlas dentro del directorio `templates/` de la extensión.

- **service.template.ts** → Define la estructura de los servicios generados.
- **component.template.ts** → Estructura base de los componentes Angular.
- **model.template.ts** → Define las interfaces TypeScript generadas.

### **Guardar Última API Usada**

La extensión recuerda la última API que utilizaste y la selecciona automáticamente en futuras sesiones.  
Para restablecer la API guardada, puedes limpiar el estado global desde `storageUtils.ts` o seleccionar una nueva API manualmente.

---

## 🛠 Contribuciones

Si encuentras algún problema o tienes sugerencias para mejorar la extensión, abre un [issue en GitHub](https://github.com/nick130920/angular-generator/issues) o envía un pull request.

---

## 📜 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.
