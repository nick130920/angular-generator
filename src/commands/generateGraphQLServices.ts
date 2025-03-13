import { writeFile } from '../utils/fileWriter';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

/**
 * Genera servicios GraphQL basados en `generated.ts`
 * @param workspaceFolder Ruta base del proyecto Angular
 */
export async function generateGraphQLServices(workspaceFolder: string, generatedPath: string) {

    if (!fs.existsSync(generatedPath)) {
        throw new Error(`❌ No se encontró el archivo generado: ${generatedPath}`);
    }
    vscode.window.showInformationMessage(`📄 Archivo GraphQL encontrado en: ${generatedPath}`);


    // Importar `generated.ts`
    const generatedTypes = require(generatedPath);

    const servicesMap: { [feature: string]: string[] } = {};
    const importsMap: { [feature: string]: Set<string> } = {};

    for (const [key, gqlType] of Object.entries(generatedTypes)) {
        if (key.endsWith('GQL')) {
            const featureName = extractFeatureName(key);
            const serviceName = `${featureName}Service`;

            if (!servicesMap[featureName]) {
                servicesMap[featureName] = [];
                importsMap[featureName] = new Set();
            }

            importsMap[featureName].add(`import { ${key} } from '@core/graphql/types/generated';`);

            const method = generateGraphQLMethod(key, gqlType);
            servicesMap[featureName].push(method);
        }
    }

    for (const [feature, methods] of Object.entries(servicesMap)) {
        const serviceName = `${feature.toLowerCase()}.service.ts`;
        const filePath = `features/${feature}/services/${serviceName}`;

        const serviceContent = `
${Array.from(importsMap[feature]).join('\n')}

import { Injectable, inject, signal, WritableSignal, computed } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ${feature}Service {
    ${Array.from(importsMap[feature]).map((imp) => `private readonly ${imp.split(' ')[1].replace('}', '')} = inject(${imp.split(' ')[1].replace('}', '')});`).join('\n    ')}

    private loading = signal<boolean>(false);
    private error = signal<string | null>(null);

    isLoading = computed(() => this.loading());
    getError = computed(() => this.error());

    constructor() {}

${methods.join('\n')}
}
        `;

        await writeFile(filePath, serviceContent);
    }
}

/**
 * Extrae el nombre del feature desde el nombre del GQL generado.
 * @param gqlName Nombre del GQL
 */
function extractFeatureName(gqlName: string): string {
    return gqlName.replace(/(Create|Update|Delete|GetAll|GetById)/, '');
}

/**
 * Genera un método GraphQL basado en el tipo generado en `generated.ts`
 * @param key Nombre del GQL
 * @param gqlType Tipo de GQL importado desde `generated.ts`
 */
function generateGraphQLMethod(key: string, gqlType: any): string {
    const methodName = convertToCamelCase(key.replace('GQL', ''));
    const operationType = key.includes('Query') ? 'watch' : 'mutate';

    const params = gqlType.variables ? `(input: ${gqlType.variables})` : '()';

    return `
    /**
     * ${key} - Método generado automáticamente desde GraphQL Codegen.
     */
    ${methodName}${params}: void {
        this.loading.set(true);
        this.error.set(null);

        this.${key}.${operationType}().subscribe({
            next: ({ data }) => {
                console.log('✅ ${key} ejecutado:', data);
                this.loading.set(false);
            },
            error: (error) => {
                this.error.set(error.message);
                this.loading.set(false);
                console.error('❌ Error en ${key}:', error.message);
            },
            complete: () => this.loading.set(false),
        });
    }`;
}

/**
 * Convierte una cadena en camelCase.
 */
function convertToCamelCase(text: string): string {
    return text.charAt(0).toLowerCase() + text.slice(1);
}
