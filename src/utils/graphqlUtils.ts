import * as vscode from 'vscode';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Ejecuta GraphQL Codegen con API y ruta configurables.
 * @param workspaceFolder Ruta del workspace Angular
 * @param apiUrl URL de la API GraphQL
 * @param generatedPath Ruta donde se generará `generated.ts`
 * @returns La ruta final del archivo generado
 */
export async function executeGraphQLCodegen(
    workspaceFolder: string,
    apiUrl: string,
    generatedPath: string
): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
        const process = childProcess.exec(`GRAPHQL_API=${apiUrl} GENERATED_TS_PATH=${generatedPath} npm run generate`, { cwd: workspaceFolder });

        let output = '';

        process.stdout?.on('data', (data) => {
            output += data.toString();
            vscode.window.showInformationMessage(`📄 Codegen: ${data.toString()}`);
        });
        process.stderr?.on('data', (data) => vscode.window.showErrorMessage(`❌ Codegen Error: ${data.toString()}`));

        process.on('exit', (code) => {
            if (code === 0) {
                resolve(generatedPath);
            } else {
                reject(new Error('❌ Falló la ejecución de GraphQL Codegen.'));
            }
        });
    });
}