import { writeFile } from './fileWriter';

export async function generateModels(apiData: any) {
    for (const model of apiData.models) {
        const modelName = `${model.name}.model.ts`;
        const relativePath = `features/${model.name.toLowerCase()}/models/${modelName}`;

        const modelContent = `
export interface ${model.name} {
    ${Object.keys(model.properties).map(prop => `${prop}: ${mapType(model.properties[prop])};`).join('\n    ')}
}
        `;

        await writeFile(relativePath, modelContent);
    }
}

function mapType(property: any): string {
    if (property.type) {
        switch (property.type) {
            case 'integer': return 'number';
            case 'string': return 'string';
            case 'boolean': return 'boolean';
            case 'array': return `${mapType(property.items)}[]`;
            default: return 'any';
        }
    }
    return 'any';
}
