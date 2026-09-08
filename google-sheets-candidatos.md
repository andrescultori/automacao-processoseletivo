# Schema — Google Sheets: Candidatos Processo Seletivo

Planilha utilizada como camada de lookup rápido. Espelha dados relevantes do Excel para permitir buscas com 1 operação via `Search Rows`.

Used as a fast lookup layer. Mirrors relevant data from Excel to allow single-operation searches via `Search Rows`.

## Colunas / Columns

| Coluna | Nome | Tipo | Origem | Descrição |
|---|---|---|---|---|
| A | Email | Text | Cenário 01 | E-mail principal do candidato |
| B | CPF | Text | Cenário 01 | Somente números / Numbers only |
| C | Nome | Text | Cenário 01 | Nome completo |
| D | ClickUp_Task_ID | Text | Cenário 01 | ID da task principal no ClickUp |
| E | RA | Text | Cenário 08 | Registro Acadêmico |
| F | Data_Nascimento | Text | Cenário 02 | Formato DD/MM/YYYY |
| G | Nacionalidade | Text | Cenário 02 | — |
| H | Sexo | Text | Cenário 02 | — |
| I | Telefone | Text | Cenário 02 | Com código do país |
| J | Semestre | Text | Cenário 01 | Ex: 2026-1 |
| K | Curso | Text | Cenário 01 | Curso de graduação/pós |
| L | Modalidade | Text | Cenário 01 | Presencial / EAD |
| M | Plano | Text | Cenário 01 | Completo / Curso / etc |
| N | Valor_Total | Number | Cenário 01 | Mensalidade sem desconto |
| O | Valor_Oferecido | Number | Cenário 01 | Mensalidade com desconto |
| P | Desconto | Formula | Calculado | `=(N-O)/N` — percentual |
| Q | Cidade | Text | Cenário 02 | — |
| R | Estado | Text | Cenário 02 | — |
| S | País | Text | Cenário 02 | — |
| T | Nome_Mae | Text | Cenário 02 | — |
| U | Tel_Mae | Text | Cenário 02 | — |
| V | Nome_Pai | Text | Cenário 02 | — |
| W | Tel_Pai | Text | Cenário 02 | — |
| X | Nome_Emergencia | Text | Cenário 02 | Contato de emergência |
| Y | Tel_Emergencia | Text | Cenário 02 | — |
| Z | Rel_Emergencia | Text | Cenário 02 | Relação com o candidato |
| AA | Nome_Pastor | Text | Cenário 02 | — |
| AB | Tel_Pastor | Text | Cenário 02 | — |
| AC | Email_Pastor | Text | Cenário 02 | Sincronizado via cenário avulso |
| AD | Estado_Civil | Text | Cenário 02 | — |
| AE | Profissao | Text | Cenário 02 | — |
| AF | RG | Text | Cenário 02 | — |
| AG | Orgao_RG | Text | Cenário 02 | — |
| AH | Endereco | Text | Cenário 02 | — |
| AI | CEP | Text | Cenário 02 | — |
| AJ | Nome_Fiador | Text | Cenário 02 | — |
| AK | Nacionalidade_Fiador | Text | Cenário 02 | — |
| AL | Estado_Civil_Fiador | Text | Cenário 02 | — |
| AM | Profissao_Fiador | Text | Cenário 02 | — |
| AN | Nascimento_Fiador | Text | Cenário 02 | — |
| AO | RG_Fiador | Text | Cenário 02 | — |
| AP | Orgao_RG_Fiador | Text | Cenário 02 | — |
| AQ | CPF_Fiador | Text | Cenário 02 | Somente números |
| AR | Endereco_Fiador | Text | Cenário 02 | — |
| AS | Cidade_Fiador | Text | Cenário 02 | — |
| AT | Estado_Fiador | Text | Cenário 02 | — |
| AU | CEP_Fiador | Text | Cenário 02 | — |
| AV | Telefone_Fiador | Text | Cenário 02 | — |
| AW | Email_Fiador | Text | Cenário 02 | — |
| AX | Candidatos_Row_ID | Text | Cenário 01 | Row ID no Excel Candidatos |
| AY | Formulario_Row_ID | Text | Cenário 02 | Row ID no Excel Formulário |
| AZ | Pessoal_Row_ID | Text | Cenário 03 | Row ID no Excel Pessoal |
| BA | Pastoral_Row_ID | Text | Cenário 04 | Row ID no Excel Pastoral |
| BB | Entrevista_Row_ID | Text | Cenário 06 | Row ID no Excel Entrevista |
| BC | Kommo_Contact_ID | Number | Cenário 00 | ID do contato no Kommo |
| BD | Kommo_Lead_ID | Number | Cenário 00 | ID do lead no Kommo |
| BE | Proposta_Financeira_File_ID | Text | Cenário 01 | File ID no OneDrive |
| BF | Contrato_File_ID | Text | Cenário 09 | File ID no OneDrive |
| BG | Declaracao_File_ID | Text | Cenário 08 | File ID no OneDrive |
| BH | Formulario_File_ID | Text | Cenário 02 | File ID no OneDrive |
| BI | Formulario_Pessoal_File_ID | Text | Cenário 03 | File ID no OneDrive |
| BJ | Formulario_Pastoral_File_ID | Text | Cenário 04 | File ID no OneDrive |
| BK | Entrevista_File_ID | Text | Cenário 06 | File ID no OneDrive |

## Padrões / Patterns

- **CPF:** somente números, sem pontos ou hífen
- **Telefone:** com código do país (+55...)
- **Datas:** formato DD/MM/YYYY como texto
- **IDs numéricos do Kommo:** formatados como Number para evitar erro de tipo na API
- **File IDs do OneDrive:** string alfanumérica retornada pelo módulo de upload
