/**
 * Número Serial para Datas no Excel
 * Excel Date Serial Number
 *
 * O Excel armazena datas internamente como números seriais.
 * Enviar strings de data (DD/MM/YYYY ou MM/DD/YYYY) causa ambiguidade
 * dependendo da configuração regional do servidor Microsoft 365.
 *
 * Excel stores dates internally as serial numbers.
 * Sending date strings (DD/MM/YYYY or MM/DD/YYYY) causes ambiguity
 * depending on the Microsoft 365 server regional settings.
 *
 * Solução / Solution:
 * Converter a data para número serial inteiro antes de enviar ao Excel.
 * Convert the date to an integer serial number before sending to Excel.
 *
 * Fórmula Make.com (usar no SetVariables):
 * Make.com formula (use in SetVariables):
 *
 * {{round(parseNumber(formatDate(parseDate(DATA; "DD/MM/YYYY"); "X")) / 86400 + 25569; 0)}}
 *
 * Onde / Where:
 * - DATA: string no formato DD/MM/YYYY / string in DD/MM/YYYY format
 * - formatDate(...; "X"): converte para timestamp Unix / converts to Unix timestamp
 * - / 86400: converte segundos para dias / converts seconds to days
 * - + 25569: ajusta para epoch do Excel (01/01/1900) / adjusts for Excel epoch (01/01/1900)
 * - round(...; 0): remove casas decimais (hora) / removes decimals (time)
 *
 * Exemplos / Examples:
 * "01/07/2026" → 46013
 * "15/03/2026" → 45900
 *
 * IMPORTANTE: A coluna no Excel deve estar formatada como "Data" (não "Texto")
 * IMPORTANT: The Excel column must be formatted as "Date" (not "Text")
 */

// Este arquivo serve como documentação da fórmula Make.com
// This file serves as documentation for the Make.com formula
// Não é executado diretamente / Not executed directly

const exemplo = {
  formula_make: `{{round(parseNumber(formatDate(parseDate(DATA; "DD/MM/YYYY"); "X")) / 86400 + 25569; 0)}}`,
  entrada: "01/07/2026",
  saida: 46013,
  nota: "A coluna Excel deve estar formatada como Data / Excel column must be formatted as Date"
};

module.exports = exemplo;
