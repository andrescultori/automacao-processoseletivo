# Blueprints — Make.com

## O que são blueprints? / What are blueprints?

Blueprints são arquivos JSON que representam a estrutura completa de um cenário no Make.com. Eles podem ser importados diretamente na plataforma para recriar o cenário.

Blueprints are JSON files representing the complete structure of a Make.com scenario. They can be imported directly into the platform to recreate the scenario.

## ⚠️ Dados Sanitizados / Sanitized Data

Todos os blueprints foram sanitizados. Os seguintes valores foram removidos e substituídos por placeholders:

All blueprints have been sanitized. The following values were removed and replaced with placeholders:

| Placeholder | Descrição / Description |
|---|---|
| `YOUR_EXCEL_WORKBOOK_ID` | ID do workbook Excel / Excel workbook ID |
| `YOUR_ONEDRIVE_FOLDER_ID` | ID da pasta OneDrive / OneDrive folder ID |
| `YOUR_CLICKUP_LIST_ID` | ID da lista ClickUp / ClickUp list ID |
| `YOUR_CLICKUP_TEMPLATE_ID` | ID do template ClickUp / ClickUp template ID |
| `YOUR_TALLY_FORM_ID` | ID do formulário Tally / Tally form ID |
| `YOUR_GOOGLE_SHEETS_ID` | ID da planilha Google Sheets / Google Sheets spreadsheet ID |
| `YOUR_KOMMO_PIPELINE_ID` | ID do pipeline Kommo / Kommo pipeline ID |
| `YOUR_KOMMO_STATUS_ID` | ID do status Kommo / Kommo status ID |
| `YOUR_GEMINI_MODEL` | Modelo Gemini utilizado / Gemini model used |

## Como importar / How to import

1. Acesse o Make.com e crie um novo cenário / Go to Make.com and create a new scenario
2. Clique nos três pontos (···) no canto superior direito / Click the three dots (···) in the top right corner
3. Selecione **Import Blueprint** / Select **Import Blueprint**
4. Faça upload do arquivo `.json` desejado / Upload the desired `.json` file
5. Substitua todos os placeholders `YOUR_*` pelos seus valores reais / Replace all `YOUR_*` placeholders with your actual values
6. Reconfigure as conexões (OAuth2, API Keys) / Reconfigure connections (OAuth2, API Keys)

## Ordem de implementação recomendada / Recommended implementation order

1. `00-formulario-interesse.json`
2. `01-proposta-financeira.json`
3. `02-formulario-inscricao.json`
4. `03-formulario-pessoal.json`
5. `04-formulario-pastoral.json`
6. `05-agendar-entrevista.json`
7. `06-parecer-entrevista.json`
8. `07-envio-documentos.json`
9. `08-registro-ra-declaracao.json`
10. `09-emissao-contrato.json`
11. `10-pagamento-confirmado.json`
12. `11-checkin.json`

## Dependências entre cenários / Inter-scenario dependencies

```
[00] → cria registro no Google Sheets (Kommo_Lead_ID)
  └─► [01] → complementa registro (Candidatos_Row_ID, ClickUp_Task_ID)
        └─► [02] → adiciona Formulario_Row_ID
              └─► [03] → adiciona Pessoal_Row_ID
              └─► [04] → adiciona Pastoral_Row_ID
                    └─► [05] → usa PDFs dos cenários 02 e 03
                          └─► [06] → usa ClickUp_Task_ID
                                └─► [07] → usa ClickUp_Task_ID
                                      └─► [08] → adiciona RA + Declaracao_File_ID
                                            └─► [09] → usa todos os dados do GSheets
                                                  └─► [10] → usa ClickUp_Task_ID
                                                        └─► [11] → usa Kommo_Lead_ID
```
