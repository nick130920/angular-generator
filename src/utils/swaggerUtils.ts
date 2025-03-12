import * as yaml from 'js-yaml';

/**
 * Parsea un archivo Swagger JSON o YAML y extrae endpoints y modelos.
 * @param schema Contenido del archivo Swagger
 * @returns Un objeto con endpoints y modelos
 */
export function parseSwaggerSchema(schema: string): { endpoints: any[], models: any[] } {
    const parsedSchema = yaml.load(schema) as any;
    
    if (!parsedSchema || !parsedSchema.paths || !parsedSchema.components) {
        throw new Error("El archivo Swagger no tiene una estructura válida.");
    }

    const endpoints: any[] = [];
    const models: any[] = [];

    // Extraer los endpoints
    Object.keys(parsedSchema.paths).forEach((path) => {
        const methods = parsedSchema.paths[path];
        Object.keys(methods).forEach((method) => {
            const operation = methods[method];
            endpoints.push({
                url: path,
                method: method.toUpperCase(),
                operationId: operation.operationId || '',
                parameters: operation.parameters || [],
                responses: operation.responses || {}
            });
        });
    });

    // Extraer los modelos
    if (parsedSchema.components?.schemas) {
        Object.keys(parsedSchema.components.schemas).forEach((modelName) => {
            const model = parsedSchema.components.schemas[modelName];
            models.push({
                name: modelName,
                properties: model.properties
            });
        });
    }

    return { endpoints, models };
}
