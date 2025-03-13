import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

/**
 * Escribe un archivo en la estructura de Angular.
 * @param relativePath Ruta relativa dentro de `src/app/`
 * @param content Contenido del archivo a escribir
 */
export async function writeFile(relativePath: string, content: string): Promise<void> {
    try {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('❌ No se pudo determinar la carpeta del proyecto.');
            return;
        }

        const filePath = path.join(workspaceFolder, 'src/app/', relativePath);

        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

        await fs.promises.writeFile(filePath, content, 'utf-8');

        vscode.window.showInformationMessage(`✅ Archivo generado: ${filePath}`);
    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error al escribir el archivo ${relativePath}: ${(error as Error).message}`);
    }
}

