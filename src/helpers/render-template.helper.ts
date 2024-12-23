import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export function renderTemplate(
  filename: string,
  variables: Record<string, any>,
): string {
  const templatePath = path.join(__dirname, '..', '..', 'templates', filename);
  
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(templateSource);
  return template(variables);
}
