import { writeFile } from './fileWriter';

export async function generateServices(apiData: any) {
    for (const endpoint of apiData.endpoints) {
        const serviceName = `${endpoint.name}.service.ts`;
        const serviceContent = `
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ${endpoint.name}Service {
    constructor(private http: HttpClient) {}

    ${endpoint.methods.map(method => `
    ${method.name}(): Observable<any> {
        return this.http.${method.type}('${endpoint.url}');
    }
    `).join('\n')}
}
        `;
        await writeFile(`src/app/services/${serviceName}`, serviceContent);
    }
}
