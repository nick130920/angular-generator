
import * as vscode from 'vscode';
import axios from 'axios';
import * as yaml from 'js-yaml';

/**
 * Obtiene la especificación Swagger desde una URL y la analiza.
 * @param apiUrl URL del Swagger JSON/YAML
 * @returns Un objeto con endpoints y modelos
 */
export async function parseSwaggerSchema(apiUrl: string): Promise<{ endpoints: any[], models: any[] }> {
    try {
        const response = await axios.get(apiUrl);
        let swaggerData: any = response.data;

        if (typeof swaggerData === 'string') {
            swaggerData = yaml.load(swaggerData); // Convierte YAML en JSON
        }

        if (!swaggerData.paths || !swaggerData.components) {
            throw new Error("La especificación Swagger no tiene una estructura válida.");
        }

        const endpoints: any[] = [];
        const models: any[] = [];

        // Extraer los endpoints
        Object.keys(swaggerData.paths).forEach((path) => {
            const methods = swaggerData.paths[path];
            Object.keys(methods).forEach((method) => {
                const operation = methods[method];
                endpoints.push({
                    url: path,
                    method: method.toUpperCase(),
                    tags: operation.tags[0] || ['shared'],
                    summary: operation.summary || '',
                    description: operation.description || '',
                    operationId: operation.operationId || '',
                    parameters: operation.parameters || [],
                    requestBody: operation.requestBody || null,
                    responses: operation.responses || {}
                });
            });
        });

        // Extraer los modelos
        if (swaggerData.components?.schemas) {
            Object.keys(swaggerData.components.schemas).forEach((modelName) => {
                const model = swaggerData.components.schemas[modelName];
                models.push({
                    name: modelName,
                    properties: model.properties || {}
                });
            });
        }

        return { endpoints, models };
    } catch (error) {
        vscode.window.showErrorMessage(`Error al obtener Swagger desde ${apiUrl}: ${(error as Error).message}`);
        return { endpoints: [], models: [] };
    }
}
