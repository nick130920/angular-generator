import * as vscode from 'vscode';

const LAST_USED_API_KEY = 'angularGenerator.lastUsedApi';

export function getLastUsedApi(context: vscode.ExtensionContext): { type: string; file: string } | null {
    return context.globalState.get<{ type: string; file: string }>(LAST_USED_API_KEY) || null;
}

export function saveLastUsedApi(context: vscode.ExtensionContext, apiInfo: { type: string; file: string }) {
    context.globalState.update(LAST_USED_API_KEY, apiInfo);
}
