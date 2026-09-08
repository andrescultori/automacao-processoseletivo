/**
 * Atualização Dinâmica de Dropdown no Tally via API
 * Dynamic Dropdown Update in Tally via API
 *
 * A API do Tally permite atualizar as opções de um dropdown via PATCH.
 * The Tally API allows updating dropdown options via PATCH.
 *
 * O PATCH substitui o array completo de blocks — qualquer block omitido é deletado.
 * PATCH replaces the entire blocks array — any omitted block is deleted.
 *
 * Este script:
 * 1. Recebe o array completo de blocks do formulário (via GET)
 * 2. Localiza o dropdown pelo nome do campo (field_name)
 * 3. Remove as opções antigas
 * 4. Gera novas opções com UUIDs válidos
 * 5. Retorna o array completo para o PATCH
 *
 * This script:
 * 1. Receives the complete form blocks array (via GET)
 * 2. Locates the dropdown by field name (field_name)
 * 3. Removes old options
 * 4. Generates new options with valid UUIDs
 * 5. Returns the complete array for PATCH
 *
 * Inputs (Make.com Code module):
 *   - blocks: {{GET.data.blocks}} — array completo de blocks / complete blocks array
 *   - opcoes: array de strings com as novas opções / string array with new options
 *   - field_name: nome do campo no formulário / field name in the form
 *   - is_required: "true" ou "false" / "true" or "false"
 *
 * Output:
 *   - blocks: JSON string com array completo atualizado / JSON string with updated complete array
 *
 * Endpoints Tally API:
 *   GET  https://api.tally.so/forms/{formId}
 *   PATCH https://api.tally.so/forms/{formId}
 *   Headers: Authorization: Bearer {token}
 */

const blocks = Array.isArray(input.blocks) ? input.blocks : [];
const opcoesRaw = Array.isArray(input.opcoes) ? input.opcoes : [input.opcoes];
const fieldName = input.field_name.trim().toLowerCase();
const isRequired = input.is_required === 'true' || input.is_required === true;

// Gerador de UUID v4 válido / Valid UUID v4 generator
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Extrai string de cada item (suporta string direta ou objeto com valor)
// Extracts string from each item (supports direct string or object with value)
const opcoes = opcoesRaw
  .map(obj => typeof obj === 'string' ? obj : Object.values(obj)[0])
  .filter(nome => nome && String(nome).trim() !== '');

// Localiza o bloco TITLE pelo nome do campo
// Locates TITLE block by field name
const titleBlock = blocks.find(b => {
  if (b.type !== 'TITLE') return false;
  const payload = b.payload || b.payloadCollection || {};
  const schema = payload.safeHTMLSchema || payload.safeHTMLSchemaArray || [];
  const text = JSON.stringify(schema).toLowerCase();
  return text.includes(fieldName);
});

if (!titleBlock) {
  return { error: `Campo "${input.field_name}" não encontrado no formulário. / Field "${input.field_name}" not found in form.` };
}

const titleUuid = titleBlock.uuid;
const titleIndex = blocks.findIndex(b => b.uuid === titleUuid);

// Descobre o groupUuid das opções DROPDOWN_OPTION após o TITLE
// Discovers groupUuid of DROPDOWN_OPTION blocks after TITLE
let groupUuid = null;
for (let i = titleIndex + 1; i < blocks.length; i++) {
  if (blocks[i].type === 'DROPDOWN_OPTION') {
    groupUuid = blocks[i].groupUuid;
    break;
  }
  if (blocks[i].type === 'TITLE') break;
}

if (!groupUuid) {
  return { error: `Dropdown não encontrado após o campo "${input.field_name}". / Dropdown not found after field "${input.field_name}".` };
}

// Remove opções antigas do grupo / Remove old options from group
const blocksLimpos = blocks.filter(b =>
  !(b.type === 'DROPDOWN_OPTION' && b.groupUuid === groupUuid)
);

// Gera novas opções / Generate new options
const novasOpcoes = opcoes.map((nome, index) => ({
  type: 'DROPDOWN_OPTION',
  groupType: 'DROPDOWN',
  uuid: generateUUID(),  // UUID v4 válido obrigatório / Valid UUID v4 required
  groupUuid: groupUuid,
  payload: {
    index: index,
    isRequired: isRequired,
    isFirst: index === 0,
    isLast: index === opcoes.length - 1,
    text: String(nome).trim()
  }
}));

// Insere novas opções logo após o bloco TITLE
// Inserts new options right after the TITLE block
const blocksFinais = [];
for (const block of blocksLimpos) {
  blocksFinais.push(block);
  if (block.uuid === titleUuid) {
    blocksFinais.push(...novasOpcoes);
  }
}

return { blocks: JSON.stringify(blocksFinais) };
