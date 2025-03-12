import { writeFile } from './fileWriter';

export async function generateServices(apiData: any) {
    const servicesMap: { [feature: string]: string[] } = {};

    for (const endpoint of apiData.endpoints) {
        const featureName = endpoint.tags?.[0] || 'shared';
        if (!servicesMap[featureName]) {
            servicesMap[featureName] = [];
        }

        const methodName = `${endpoint.operationId || 'unnamedMethod'}`;
        const parameters = endpoint.parameters.map(param => `${param.name}: ${param.schema?.type || 'any'}`).join(', ');

        const method = `
    ${methodName}(${parameters}): Observable<any> {
        return this.http.${endpoint.method.toLowerCase()}(\`\${this.baseUrl}${endpoint.url}\`);
    }`;

        servicesMap[featureName].push(method);
    }

    for (const [feature, methods] of Object.entries(servicesMap)) {
        const serviceName = `${feature.toLowerCase()}.service.ts`;
        const filePath = `features/${feature}/services/${serviceName}`;

        const serviceContent = `
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ${feature}Service {
    private baseUrl = 'http://10.1.140.21:8113';

    constructor(private http: HttpClient) {}

${methods.join('\n')}
}
        `;

        await writeFile(filePath, serviceContent);
    }
}
