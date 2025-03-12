import * as vscode from 'vscode';
import { writeFile } from './fileWriter';

export async function generateComponents(apiData: any) {
    for (const model of apiData.models) {
        const componentName = `${model.name}.component.ts`;
        const componentContent = `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-${model.name.toLowerCase()}',
    templateUrl: './${model.name.toLowerCase()}.component.html',
    styleUrls: ['./${model.name.toLowerCase()}.component.scss']
})
export class ${model.name}Component implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
        `;
        await writeFile(`src/app/components/${componentName}`, componentContent);
    }
}
