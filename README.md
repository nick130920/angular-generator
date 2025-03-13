# Angular GraphQL & Swagger API Generator

🚀 **Angular GraphQL & Swagger API Generator** es una extensión para Visual Studio Code que permite generar automáticamente servicios, modelos y estructuras en **Angular 19** basados en APIs de **Swagger (OpenAPI)** y **GraphQL**.

Esta versión **permite configurar dinámicamente** la API y la ubicación del archivo generado mediante variables de entorno, evitando que las rutas se quemen en el código.

---

## 📌 Características

✅ **Generación automática de código Angular 19** desde una API **Swagger o GraphQL**.  
✅ **Soporte para OpenAPI (Swagger) y GraphQL Codegen**.  
✅ **Detección dinámica del archivo `generated.ts`** para GraphQL Codegen.  
✅ **Ejecuta `npm run generate` con una API y ubicación personalizada.**  
✅ **Generación de servicios en Angular (`HttpClient`)** para Swagger y GraphQL con `apollo-angular`.  
✅ **Integración con `signal()`, `computed()` y `WritableSignal` para reactividad.**  
✅ **Estructura modular por features** en `features/{feature}/services/`.

---

## 🛠 Instalación

1️⃣ Descarga la extensión desde el [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/).  
2️⃣ Instala la extensión en VS Code.  
3️⃣ Reinicia VS Code si es necesario.  
4️⃣ ¡Listo! Ahora puedes generar código Angular basado en tus APIs.

---

## 📌 Requisitos

- **Visual Studio Code** `1.75.0` o superior.  
- **Node.js** y **npm** instalados.  
- **Proyecto Angular 19** con **Apollo Angular** y **Swagger (OpenAPI)**.  
- **`graphql-codegen` instalado y configurado en `codegen.ts`.**  

Si tu proyecto usa **Swagger**, asegúrate de que la API tenga un **endpoint público de OpenAPI**.

---

## 📖 Uso

1️⃣ **Ejecuta el comando** `Generate Angular Frontend` desde:  

- La paleta de comandos de VS Code (`Ctrl + Shift + P` o `Cmd + Shift + P` en macOS).  
2️⃣ **Selecciona el tipo de API**:  
- **GraphQL** o **Swagger API**.  
3️⃣ **Introduce la URL de la API**:  
- Swagger: `http://10.1.140.21:8113/v3/api-docs`.  
- GraphQL: `http://10.1.140.21:8113/graphql`.  
4️⃣ **Si seleccionas GraphQL, se ejecutará `graphql-codegen` automáticamente.**  
5️⃣ **La estructura se generará automáticamente en tu proyecto Angular.**

---

## 📂 Estructura Generada

Dependiendo de la opción seleccionada, la extensión creará la siguiente estructura:

```text
src/app/
├── features/
│   ├── brand/
│   │   ├── services/
│   │   │   ├── brand.service.ts
│   │   ├── models/
│   │   │   ├── brand.model.ts
│   │   ├── brand-routing.module.ts
│
├── core/
│   ├── graphql/
│   │   ├── types/
│   │   │   ├── generated.ts  (archivo generado automáticamente por GraphQL Codegen)
│   ├── services/
│   │   ├── api.service.ts
│   ├── models/
│   │   ├── base-response.model.ts
```

Si **no activas feature-based**, los archivos se generarán en `core/services/`, `core/models/`.

---

## 🔧 Configuración Avanzada

### **Configuración de GraphQL Codegen**

La extensión ahora **acepta variables de entorno** para cambiar la API y la ubicación de `generated.ts`.

#### **Ejemplo `codegen.ts`**

```typescript
import { CodegenConfig } from '@graphql-codegen/cli';

const GRAPHQL_API = process.env['GRAPHQL_API'] || 'http://localhost:8080/graphql';
const GENERATED_TS_PATH = process.env['GENERATED_TS_PATH'] || './src/app/core/graphql/types/generated.ts';

const config: CodegenConfig = {
    schema: GRAPHQL_API,
    documents: './src/app/core/graphql/**/*.graphql',
    generates: {
        [GENERATED_TS_PATH]: {
            documents: './src/app/core/graphql/**/*.graphql',
            plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
        },
    },
};

export default config;
```

### **Ejecutar `graphql-codegen` con una API personalizada**

```sh
GRAPHQL_API=http://10.1.140.21:8113/graphql GENERATED_TS_PATH=./src/app/graphql/types/generated.ts npm run generate
```

### **Ejecutar desde Windows PowerShell**

```sh
$env:GRAPHQL_API="http://10.1.140.21:8113/graphql"; $env:GENERATED_TS_PATH="./src/app/graphql/types/generated.ts"; npm run generate
```

---

## 🛠 Contribuciones

Si encuentras algún problema o tienes sugerencias para mejorar la extensión, abre un [issue en GitHub](https://github.com/nick130920/angular-generator/issues) o envía un pull request.

---

## 📜 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.
