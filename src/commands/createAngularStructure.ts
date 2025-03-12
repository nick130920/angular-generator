import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

const ANGULAR_STRUCTURE = [
    'src/app/components/',
    'src/app/services/',
    'src/app/models/',
    'src/assets/',
    'src/environments/',
    'src/app/shared/'
];

export async function createAngularProjectStructure() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No se pudo encontrar la raíz del proyecto.');
        return;
    }

    const projectRoot = workspaceFolders[0].uri.fsPath;

    try {
        for (const dir of ANGULAR_STRUCTURE) {
            const fullPath = path.join(projectRoot, dir);
            await fs.promises.mkdir(fullPath, { recursive: true });
        }
        vscode.window.showInformationMessage('📂 Estructura del proyecto Angular creada con éxito.');
    } catch (error) {
        vscode.window.showErrorMessage(`Error al crear la estructura: ${(error as Error).message}`);
    }
}
