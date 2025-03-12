import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

const FEATURE_BASED_STRUCTURE = [
    'src/app/features/',
    'src/app/shared/services/',
    'src/app/shared/models/'
];

export async function createFeatureBasedStructure() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No se pudo encontrar la raíz del proyecto.');
        return;
    }

    const projectRoot = workspaceFolders[0].uri.fsPath;

    try {
        for (const dir of FEATURE_BASED_STRUCTURE) {
            const fullPath = path.join(projectRoot, dir);
            await fs.promises.mkdir(fullPath, { recursive: true });
        }
        vscode.window.showInformationMessage('📂 Estructura feature-based generada exitosamente.');
    } catch (error) {
        vscode.window.showErrorMessage(`Error al crear la estructura: ${(error as Error).message}`);
    }
}
