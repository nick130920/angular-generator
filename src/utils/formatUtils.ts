export function toCamelCase(text: string): string {
    return text.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
}

export function toPascalCase(text: string): string {
    return text
        .replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))
        .replace(/^\w/, (c) => c.toUpperCase());
}

export function toKebabCase(text: string): string {
    return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function toSnakeCase(text: string): string {
    return text.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
