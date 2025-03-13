import * as vscode from 'vscode';
import { generateServices } from './generateService';
import { parseSwaggerSchema } from '../utils/swaggerUtils';
import { generateModels } from './generateModels';
import { executeGraphQLCodegen } from '../utils/graphqlUtils';
import * as path from 'path';
import { generateGraphQLServices } from './generateGraphQLServices';

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
        const generatedPath = path.join(workspaceFolder, 'src/app/core/graphql/types/generated.ts');

        if (apiType.toLowerCase() === 'swagger') {
            apiData = await parseSwaggerSchema(apiUrl);
            await generateModels(apiData);
            await generateServices(apiData);

        } else if (apiType.toLowerCase() === 'graphql') {
            vscode.window.showInformationMessage('🔄 Ejecutando GraphQL Codegen...');
            const generatedFilePath = await executeGraphQLCodegen(workspaceFolder, apiUrl, generatedPath);
            if (!generatedFilePath) {
                vscode.window.showErrorMessage('❌ No se pudo encontrar el archivo generado.');
                return;
            }
            await generateGraphQLServices(workspaceFolder, generatedFilePath);

        } else {
            vscode.window.showErrorMessage(`❌ Tipo de API no reconocido: ${apiType}`);
            return;
        }

        vscode.window.showInformationMessage('🚀 Código Angular generado exitosamente.');
    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error al generar código: ${(error as Error).message}`);
    }
}
