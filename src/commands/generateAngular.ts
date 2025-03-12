import * as vscode from 'vscode';
import { parseApiSchema } from './apiParser';
import { generateServices } from './generateService';
import { generateComponents } from './generateComponents';

export async function generateAngularApp(apiType: string, apiFilePath: string) {
    try {
        // Procesar el archivo y extraer endpoints y modelos
        const apiData = await parseApiSchema(apiFilePath, apiType);

        if (!apiData) {
            vscode.window.showErrorMessage('No se pudo procesar el archivo de API.');
            return;
        }

        // Generar servicios y componentes en Angular
        await generateServices(apiData);
        await generateComponents(apiData);

        vscode.window.showInformationMessage('🚀 Código Angular generado exitosamente.');
    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error al generar código: ${(error as Error).message}`);
    }
}

