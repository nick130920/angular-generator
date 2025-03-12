import { parse, DocumentNode } from 'graphql';

/**
 * Parsea un esquema GraphQL y extrae los modelos y consultas.
 * @param schema Contenido del esquema GraphQL (.graphql)
 * @returns Un objeto con modelos y operaciones
 */
export function parseGraphQLSchema(schema: string): { models: any[], queries: any[], mutations: any[] } {
    const parsedSchema: DocumentNode = parse(schema);

    const models: any[] = [];
    const queries: any[] = [];
    const mutations: any[] = [];

    parsedSchema.definitions.forEach(definition => {
        if (definition.kind === 'ObjectTypeDefinition') {
            const typeName = definition.name.value;
            const fields = definition.fields?.map(field => ({
                name: field.name.value,
                type: field.type.kind === 'NamedType' ? field.type.name.value : 'Unknown'
            })) || [];

            if (typeName === 'Query') {
                queries.push(...fields);
            } else if (typeName === 'Mutation') {
                mutations.push(...fields);
            } else {
                models.push({ name: typeName, fields });
            }
        }
    });

    return { models, queries, mutations };
}
