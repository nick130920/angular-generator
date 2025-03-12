import * as vscode from 'vscode';
import { generateServices } from './generateService';
import { parseSwaggerSchema } from '../utils/swaggerUtils';
import { generateModels } from './generateModels';
import { executeGraphQLCodegen, parseGraphQLSchema } from '../utils/graphqlUtils';
import path from 'path';

export async function generateAngularApp(apiType: string, apiUrl: string) {
    try {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('❌ No se pudo determinar la carpeta del proyecto.');
            return;
        }

        vscode.window.showInformationMessage(`🔄 Obteniendo API desde ${apiUrl}...`);

        // Obtener los datos de la API Swagger
        let apiData;

        if (apiType.toLowerCase() === 'swagger') {
            apiData = await parseSwaggerSchema(apiUrl);
        } else if (apiType.toLowerCase() === 'graphql') {
            vscode.window.showInformationMessage('🔄 Ejecutando GraphQL Codegen...');
            await executeGraphQLCodegen(workspaceFolder);
            apiData = require(path.join(workspaceFolder, 'src/app/generated.ts'));
        } else {
            vscode.window.showErrorMessage(`❌ Tipo de API no reconocido: ${apiType}`);
            return;
        }

        if (!apiData || (apiData.endpoints?.length === 0 && apiData.models?.length === 0)) {
            vscode.window.showErrorMessage('No se pudo procesar la API Swagger.');
            return;
        }

        vscode.window.showInformationMessage(`✅ API ${apiType} obtenida correctamente. Generando archivos...`);

        // Generar modelos e interfaces TypeScript
        await generateModels(apiData);

        // Generar servicios en Angular
        await generateServices(apiData);

        vscode.window.showInformationMessage('🚀 Código Angular generado exitosamente.');
    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error al generar código: ${(error as Error).message}`);
    }
}
