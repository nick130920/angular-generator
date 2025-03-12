import * as vscode from 'vscode';
import { parseSwagger } from './apiParser';
import { promptForApiFile, promptForApiType } from './userInteraction';
import { generateServices } from './generateService';
import { generateComponents } from './generateComponents';

export async function generateAngularApp() {
    try {
        // Paso 1: Seleccionar el tipo de API (Swagger o GraphQL)
        const apiType = await promptForApiType();

        // Paso 2: Seleccionar el archivo fuente (Swagger JSON/YAML o GraphQL Schema)
        const apiFilePath = await promptForApiFile(apiType);
        if (!apiFilePath) throw new Error('No se seleccionó un archivo válido.');

        // Paso 3: Analizar el archivo Swagger o GraphQL
        const apiData = await parseSwagger(apiFilePath, apiType);

        // Paso 4: Generar Servicios y Componentes Angular
        await generateServices(apiData);
        await generateComponents(apiData);

        vscode.window.showInformationMessage('Código Angular generado con éxito.');
    } catch (error) {
        vscode.window.showErrorMessage(`Error al generar código: ${(error as Error).message}`);
    }
}
