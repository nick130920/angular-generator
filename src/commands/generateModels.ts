import { writeFile } from '../utils/fileWriter';

export async function generateModels(apiData: any) {
    for (const model of apiData.models) {
        const modelName = `${model.name}.model.ts`;
        const relativePath = `features/models/${modelName}`;

        const modelContent = `export interface ${model.name} {
    ${Object.keys(model.properties).map(prop => `${prop}: ${mapType(model.properties[prop])};`).join('\n    ')}
}`;

        await writeFile(relativePath, modelContent);
    }
}

export function mapType(property: any): string {
    if (!property || !property.type) {
        return 'any';
    }
    
    switch (property.type) {
        case 'integer':
            return 'number';
        case 'string':
            return 'string';
        case 'boolean':
            return 'boolean';
        case 'array':
            return `${mapType(property.items)}[]`;
        default:
            return 'any';
    }
}
