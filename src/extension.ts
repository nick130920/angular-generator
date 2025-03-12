import * as vscode from 'vscode';
import { generateAngularApp } from './commands/generateAngular';
import { getLastUsedApiUrl } from './utils/storageUtils';
import { promptForApiType, promptForApiUrl, promptForProjectStructure } from './commands/userInteraction';
import { createFeatureBasedStructure } from './commands/createFeatureStructure';

export async function activate(context: vscode.ExtensionContext) {
    console.log('La extensión "angular-generator" está activa.');

    const disposable = vscode.commands.registerCommand('extension.generateAngularFront', async () => {
        try {
            // Obtener la última URL de API utilizada o pedir una nueva
            let apiUrl = getLastUsedApiUrl(context);
            let apiType: string | undefined = undefined;

            if (!apiUrl) {
                apiType = await promptForApiType();
                apiUrl = await promptForApiUrl(context, apiType);
                if (!apiUrl) {
                    vscode.window.showErrorMessage('No se ingresó una URL válida.');
                    return;
                }
            }

            // Preguntar si se debe generar la estructura feature-based
            const shouldCreateStructure = await promptForProjectStructure();
            if (shouldCreateStructure) {
                await createFeatureBasedStructure();
            }

            // Generar el código Angular basado en la API obtenida
            await generateAngularApp(apiType!, apiUrl);

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
