import * as vscode from 'vscode';

const LAST_USED_API_URL_KEY = 'angularGenerator.lastUsedApiUrl';

export function getLastUsedApiUrl(context: vscode.ExtensionContext): string | null {
    return context.globalState.get<string>(LAST_USED_API_URL_KEY) || null;
}

export function saveLastUsedApiUrl(context: vscode.ExtensionContext, apiUrl: string) {
    context.globalState.update(LAST_USED_API_URL_KEY, apiUrl);
}

