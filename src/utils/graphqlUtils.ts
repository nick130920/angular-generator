import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as path from 'path';

/**
 * Ejecuta GraphQL Codegen usando el comando `npm run generate`
 * @param workspaceFolder Ruta del proyecto donde se ejecutará el Codegen
 */
export async function executeGraphQLCodegen(workspaceFolder: string) {
    return new Promise<void>((resolve, reject) => {
        const process = child_process.exec('npm run generate', { cwd: workspaceFolder });

        process.stdout?.on('data', (data) => vscode.window.showInformationMessage(`📄 Codegen: ${data.toString()}`));
        process.stderr?.on('data', (data) => vscode.window.showErrorMessage(`❌ Codegen Error: ${data.toString()}`));

        process.on('exit', (code) => {
            if (code === 0) {
                vscode.window.showInformationMessage('✅ GraphQL Codegen ejecutado correctamente.');
                resolve();
            } else {
                reject(new Error('❌ Falló la ejecución de GraphQL Codegen.'));
            }
        });
    });
}