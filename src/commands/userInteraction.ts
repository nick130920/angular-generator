import * as vscode from 'vscode';
import { getLastUsedApiUrl, saveLastUsedApiUrl } from '../utils/storageUtils';

/**
 * Prompts the user to select the type of API between Swagger and GraphQL.
 * If the user does not make a selection, defaults to 'Swagger'.
 * 
 * @returns A promise that resolves to a string representing the selected API type.
 */

export async function promptForApiType(): Promise<string> {
    return await vscode.window.showQuickPick(['Swagger', 'GraphQL'], {
        placeHolder: 'Selecciona el tipo de API'
    }) || 'Swagger';
}

/**
 * Prompts the user to enter the URL of the API and returns the input value.
 * If the user does not enter a value, returns the last used API URL.
 * If the user enters a value, saves it as the last used API URL.
 * 
 * @param context The VS Code extension context.
 * @param apiType The type of API, either 'Swagger' or 'GraphQL'.
 * @returns A promise that resolves to the input URL or null if the user does not enter a value.
 */
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
