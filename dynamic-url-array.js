/**
 * Array Dinâmico de URLs de Documentos
 * Dynamic Document URL Array
 *
 * Substitui 9 rotas fixas paralelas por um Iterator dinâmico.
 * Replaces 9 fixed parallel routes with a dynamic Iterator.
 *
 * Antes / Before: 9 rotas × 2 módulos = 18 módulos
 * Depois / After: JavaScript + Iterator = 4 módulos
 *
 * Funcionalidades / Features:
 * - Filtra campos vazios / Filters empty fields
 * - Valida presença de accessToken na URL do Tally / Validates accessToken in Tally URL
 * - Trata múltiplos arquivos por campo / Handles multiple files per field
 * - Nomeia arquivos por tipo de documento / Names files by document type
 *
 * Inputs (Make.com Code module):
 *   - doc1 até doc9: URLs dos campos de upload do Tally / Tally upload field URLs
 *
 * Output:
 *   - documentos: JSON string com array de {url, nome} / JSON string with {url, nome} array
 */

function parseUrls(value) {
  if (!value || typeof value !== 'string' || value.trim() === '') return [];
  return value.split(',')
    .map(u => u.trim())
    .filter(u => u !== '' && u.includes('accessToken'));
}

const inputs = [
  { urls: parseUrls(input.doc1), nome: "RG" },
  { urls: parseUrls(input.doc2), nome: "CPF" },
  { urls: parseUrls(input.doc3), nome: "CNH" },
  { urls: parseUrls(input.doc4), nome: "Certidao_de_Casamento" },
  { urls: parseUrls(input.doc5), nome: "Comprovante_de_Residencia" },
  { urls: parseUrls(input.doc6), nome: "Cartao_de_Vacinacao" },
  { urls: parseUrls(input.doc7), nome: "Cartao_do_SUS" },
  { urls: parseUrls(input.doc8), nome: "Cartao_do_Plano_de_Saude" },
  { urls: parseUrls(input.doc9), nome: "Historico_do_Ensino_Medio" },
];

const filtered = [];
inputs.forEach(doc => {
  doc.urls.forEach((url, index) => {
    filtered.push({
      url: url,
      // Adiciona sufixo numérico quando há múltiplos arquivos no mesmo campo
      // Adds numeric suffix when multiple files in the same field
      nome: doc.urls.length > 1
        ? doc.nome + '_' + (index + 1)
        : doc.nome
    });
  });
});

return {
  documentos: JSON.stringify(filtered),
  total: filtered.length
};
