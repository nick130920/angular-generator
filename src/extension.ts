import * as vscode from 'vscode';
import { generateAngularApp } from './commands/generateAngular';
import { promptForApiType, promptForApiFile, promptForProjectStructure } from './commands/userInteraction';
import { getLastUsedApi, saveLastUsedApi } from './utils/storageUtils';
import { createAngularProjectStructure } from './commands/createAngularStructure';

export async function activate(context: vscode.ExtensionContext) {
    console.log('La extensión "angular-generator" está activa.');

    const disposable = vscode.commands.registerCommand('extension.generateAngularFront', async () => {
        try {
            // Obtener la última API usada o pedir al usuario que seleccione una nueva
            let apiInfo = getLastUsedApi(context);
            if (!apiInfo) {
                const apiType = await promptForApiType();
                const apiFile = await promptForApiFile(apiType);
                if (!apiFile) {
                    vscode.window.showErrorMessage('No se seleccionó un archivo válido.');
                    return;
                }
                apiInfo = { type: apiType, file: apiFile };
                saveLastUsedApi(context, apiInfo);
            }

            // Preguntar si se desea generar la estructura de archivos estándar
            const shouldCreateStructure = await promptForProjectStructure();
            if (shouldCreateStructure) {
                await createAngularProjectStructure();
            }

            // Generar código Angular
            await generateAngularApp(apiInfo.type, apiInfo.file);

            vscode.window.showInformationMessage('🚀 Código Angular generado exitosamente.');
        } catch (error) {
            vscode.window.showErrorMessage(`❌ Error: ${(error as Error).message}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
    console.log('La extensión "angular-generator" se ha desactivado.');
}
