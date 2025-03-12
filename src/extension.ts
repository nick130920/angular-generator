import * as vscode from 'vscode';
import { generateAngularApp } from './commands/generateAngular';

export function activate(context: vscode.ExtensionContext) {
    console.log('La extensión "angular-generator" está activa.');

    const disposable = vscode.commands.registerCommand('extension.generateAngularFront', async () => {
        try {
            await generateAngularApp();
        } catch (err) {
            vscode.window.showErrorMessage(`Error: ${(err as Error).message}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
    console.log('La extensión "angular-generator" se ha desactivado.');
}
