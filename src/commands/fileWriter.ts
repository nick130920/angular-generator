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
        // 🔹 Obtener la raíz del proyecto en VS Code
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('❌ No se pudo determinar la carpeta del proyecto.');
            return;
        }

        // 🔹 Construir la ruta absoluta dentro del proyecto
        const filePath = path.join(workspaceFolder, 'src/app/', relativePath);

        // 🔹 Crear carpetas si no existen
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

        // 🔹 Escribir el archivo
        await fs.promises.writeFile(filePath, content, 'utf-8');

        vscode.window.showInformationMessage(`✅ Archivo generado: ${filePath}`);
    } catch (error) {
        vscode.window.showErrorMessage(`❌ Error al escribir el archivo ${relativePath}: ${(error as Error).message}`);
    }
}
