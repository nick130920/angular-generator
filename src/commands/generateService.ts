import { writeFile } from '../utils/fileWriter';
import { mapType } from './generateModels';
import * as fs from 'fs';
import * as path from 'path';

export async function generateServices(apiData: any) {
    const servicesMap: { [feature: string]: { methods: string[], imports: Set<string> } } = {};
    const templatePath = path.join(__dirname, '..', '..', 'templates', 'service.template');
    
    if (!fs.existsSync(templatePath)) {
        throw new Error(`❌ No se encontró la plantilla: ${templatePath}`);
    }

    for (const endpoint of apiData.endpoints) {
        const featureName = endpoint.tags || 'shared';
        if (!servicesMap[featureName]) {
            servicesMap[featureName] =  { methods: [], imports: new Set() };
        }

        const methodName = `${endpoint.operationId || 'unnamedMethod'}`;
        const parameters = endpoint.parameters.map(
            (param: { name: any; schema: { type: any; }; }) => `${param.name}: ${mapType(param.schema) || 'any'}`
        ).join(', ');

        const requestBodyType = endpoint.requestBody
            ? extractRequestBodyType(endpoint.requestBody)
            : '';
        const returnType = extractResponseType(endpoint.responses);

        // Agregar importación si el tipo de retorno es válido
        if (returnType && returnType !== 'void' && returnType !== 'any' && returnType !== 'any[]') {
            servicesMap[featureName].imports.add(`import { ${returnType} } from '@features/models/${returnType}.model';`);
        }
        if (requestBodyType && requestBodyType !== 'any' && requestBodyType !== 'any[]') {
            servicesMap[featureName].imports.add(`import { ${requestBodyType} } from '@features/models/${requestBodyType}.model';`);
        }
        // Reemplazar parámetros de ruta en la URL de {param} a ${param}
        endpoint.url = endpoint.url.replace(/\{([^}]+)\}/g, (match: any, param: any) => `\${${param}}`);


        const method = 
        `    /**
     * ${endpoint.summary || 'No summary provided'}${endpoint.description ? `\n     * ${endpoint.description}` : ''}
     *
     *${endpoint.parameters.length > 0 ? `\n     * @param ${endpoint.parameters.map((param: any) => `${param.name} - ${param.description || 'No description'}`).join('\n     * @param ')}` : ''}${
        requestBodyType ? `\n     * @param requestBody - Data to send in request body` : ''}
     * @returns ${returnType}
     */
    ${methodName}(${parameters}${parameters && requestBodyType ? ', ' : ''}${requestBodyType ? `requestBody: ${requestBodyType}` : ''}): Observable<${returnType}> {
        return this.httpClient.${endpoint.method.toLowerCase()}<${returnType}>(\`\${this.baseUrl}${endpoint.url}\`${requestBodyType ? ', requestBody' : ''});
    }`;
        
        servicesMap[featureName].methods.push(method);
    }

    for (const [feature, { methods, imports }] of Object.entries(servicesMap)) {
        const serviceName = `${feature.toLowerCase()}.service.ts`;
        const filePath = `features/${feature}/services/${serviceName}`;

        let serviceContent = fs.readFileSync(templatePath, 'utf-8');
        serviceContent = serviceContent
            .replace(/\${FEATURE}/g, feature)
            .replace(/\${METHODS}/g, methods.join('\n'))
            .replace(/\${IMPORTS}/g, Array.from(imports).join('\n'));
        await writeFile(filePath, serviceContent);
    }
}

/**
 * Extrae el tipo de datos del cuerpo de la solicitud de Swagger/OpenAPI.
 */
function extractRequestBodyType(requestBody: any): string {
    if (requestBody?.content) {
        const contentType = Object.keys(requestBody.content)[0];
        const schema = requestBody.content[contentType]?.schema;
        return schema?.$ref ? schema.$ref.split('/').pop() : mapType(schema);
    }
    return 'any';
}

/**
 * Extrae el tipo de retorno del endpoint basado en las respuestas de Swagger/OpenAPI.
 */
function extractResponseType(responses: any): string {
    if (!responses) {return 'any';}

    const responseCodes = Object.keys(responses);
    if (responseCodes.includes('200')) {
        const content = responses['200'].content;
        if (content) {
            const contentType = Object.keys(content)[0];
            const schema = content[contentType]?.schema;
            return schema?.$ref ? schema.$ref.split('/').pop() : mapType(schema);
        }
    }

    return 'void';
}


