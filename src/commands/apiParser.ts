import * as fs from 'fs';
import { executeGraphQLCodegen } from '../utils/graphqlUtils';
import { parseSwaggerSchema } from '../utils/swaggerUtils';

export async function parseApiSchema(filePath: string, apiType: string): Promise<any> {
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    return apiType === 'graphql' ? executeGraphQLCodegen(fileContent) : parseSwaggerSchema(fileContent);
}

