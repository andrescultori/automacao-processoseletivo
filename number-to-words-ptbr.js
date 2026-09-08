/**
 * Conversão de Número para Extenso em Português (pt-BR)
 * Number to Words Conversion in Portuguese (pt-BR)
 *
 * Utilizado na geração de contratos e propostas financeiras.
 * Used in contract and financial proposal generation.
 *
 * Converte dois valores simultaneamente:
 * - Valor monetário (reais e centavos)
 * - Percentual de desconto (por extenso)
 *
 * Converts two values simultaneously:
 * - Monetary value (reais and centavos)
 * - Discount percentage (in words)
 *
 * Inputs (Make.com Code module):
 *   - valor: string no formato "1.550,00" / string in format "1.550,00"
 *   - desconto: string no formato "24,87" / string in format "24,87"
 *
 * Output:
 *   - valor_extenso: "um mil e quinhentos e cinquenta reais"
 *   - desconto_extenso: "vinte e quatro vírgula oitenta e sete por cento"
 */

const unidades = ['','um','dois','três','quatro','cinco','seis','sete','oito','nove',
  'dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove'];
const dezenas = ['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
const centenas = ['','cem','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'];

function parseValor(str) {
  if (!str) return { inteiro: 0, centavos: 0 };
  const parts = String(str).replace(/\./g, '').split(',');
  return {
    inteiro: parseInt(parts[0]) || 0,
    centavos: parseInt((parts[1] || '00').padEnd(2, '0')) || 0
  };
}

function menorQueMil(n) {
  if (n === 0) return '';
  if (n === 100) return 'cem';
  let result = '';
  const c = Math.floor(n / 100);
  const resto = n % 100;
  if (c > 0) result += centenas[c];
  if (resto === 0) return result;
  if (result) result += ' e ';
  if (resto < 20) return result + unidades[resto];
  const d = Math.floor(resto / 10);
  const u = resto % 10;
  result += dezenas[d];
  if (u > 0) result += ' e ' + unidades[u];
  return result;
}

function porExtenso(n) {
  if (n === 0) return 'zero';
  let result = '';
  const milhares = Math.floor(n / 1000);
  const resto = n % 1000;
  if (milhares > 0) {
    result += menorQueMil(milhares) + ' mil';
    if (resto > 0) result += ' e ';
  }
  result += menorQueMil(resto);
  return result;
}

// Valor monetário em reais
function valorExtenso(str) {
  const { inteiro, centavos } = parseValor(str);
  let result = '';
  if (inteiro > 0) {
    result += porExtenso(inteiro) + (inteiro === 1 ? ' real' : ' reais');
  }
  if (centavos > 0) {
    if (result) result += ' e ';
    result += porExtenso(centavos) + (centavos === 1 ? ' centavo' : ' centavos');
  }
  return result || 'zero reais';
}

// Percentual de desconto
function descontoExtenso(str) {
  const { inteiro, centavos } = parseValor(str);
  let result = porExtenso(inteiro);
  if (centavos > 0) {
    result += ' vírgula ' + porExtenso(centavos);
  }
  return result + ' por cento';
}

return {
  valor_extenso: valorExtenso(input.valor),
  desconto_extenso: descontoExtenso(input.desconto)
};
