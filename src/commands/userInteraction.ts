import * as vscode from 'vscode';
import { getLastUsedApiUrl, saveLastUsedApiUrl } from '../utils/storageUtils';

export async function promptForApiType(): Promise<string> {
    return await vscode.window.showQuickPick(['Swagger', 'GraphQL'], {
        placeHolder: 'Selecciona el tipo de API'
    }) || 'Swagger';
}

export async function promptForApiUrl(context: vscode.ExtensionContext, apiType: string): Promise<string | null> {
    // Recupera la última URL utilizada y la convierte en un string vacío si es null
    const lastApiUrl: string | null = getLastUsedApiUrl(context);
    
    // Muestra un input con la última URL como valor predeterminado
    const apiUrl = await vscode.window.showInputBox({
        placeHolder: `Ejemplo: https://api.example.com/${apiType.toLowerCase()}.json`,
        prompt: 'Introduce la URL donde se encuentra la API',
        value: lastApiUrl ?? '', // Usa '' si lastApiUrl es null
        ignoreFocusOut: true
    });

    // Si el usuario ingresa una URL, la guardamos
    if (apiUrl && apiUrl.trim() !== '') {
        saveLastUsedApiUrl(context, apiUrl);
        return apiUrl;
    }

    return lastApiUrl; // Retorna la última URL usada en caso de que no se ingrese nada
}


export async function promptForProjectStructure(): Promise<boolean> {
    const response = await vscode.window.showQuickPick(['Sí', 'No'], {
        placeHolder: '¿Deseas generar la estructura feature-based para el proyecto Angular?'
    });

    return response === 'Sí';
}
