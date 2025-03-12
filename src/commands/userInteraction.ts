import * as vscode from 'vscode';

export async function promptForApiType(): Promise<string> {
    return await vscode.window.showQuickPick(['Swagger', 'GraphQL'], {
        placeHolder: 'Selecciona el tipo de API'
    }) || 'Swagger';
}

export async function promptForApiFile(apiType: string): Promise<string | undefined> {
    const fileUri = await vscode.window.showOpenDialog({
        canSelectMany: false,
        filters: { [apiType]: apiType === 'Swagger' ? ['json', 'yaml'] : ['graphql'] }
    });

    return fileUri ? fileUri[0].fsPath : undefined;
}
