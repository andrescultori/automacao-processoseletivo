/**
 * Kommo CRM — Extração de Campo Customizado
 * Kommo CRM — Custom Field Extraction
 *
 * O Kommo retorna campos customizados como array aninhado.
 * O Make.com não consegue filtrar arrays aninhados nativamente.
 * Este script extrai o valor de um campo específico pelo seu field_id.
 *
 * Kommo returns custom fields as a nested array.
 * Make.com cannot natively filter nested arrays.
 * This script extracts the value of a specific field by its field_id.
 *
 * Inputs (Make.com Code module):
 *   - fields: {{1.leads.update[].custom_fields[]}}
 *   - field_id: ID numérico do campo no Kommo / Numeric field ID in Kommo
 *
 * Output:
 *   - value: valor do campo / field value (null se não encontrado / if not found)
 */

const fields = Array.isArray(input.fields) ? input.fields : [input.fields];

// field_id YOUR_FIELD_ID = nome do campo / field name
const field = fields.find(f =>
  f !== null &&
  f !== undefined &&
  String(f.id) === String(input.field_id)
);

const value = field && field.values && field.values[0]
  ? field.values[0].value
  : null;

return { value: value };
