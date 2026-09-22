# Blueprints — Make.com

## O que são blueprints? / What are blueprints?

Blueprints são arquivos JSON que representam a estrutura completa de um cenário no Make.com. Eles podem ser importados diretamente na plataforma para recriar o cenário.

Blueprints are JSON files representing the complete structure of a Make.com scenario. They can be imported directly into the platform to recreate the scenario.

## ⚠️ Dados Sanitizados / Sanitized Data

Todos os blueprints foram sanitizados. Nomes reais (instituição, parceiros, candidatos, colaboradores), domínios, números de telefone e todos os identificadores de conexão foram removidos ou substituídos:

All blueprints have been sanitized. Real names (institution, partners, candidates, staff), domains, phone numbers, and every connection identifier have been removed or replaced:

| Placeholder / valor sanitizado | Descrição / Description |
|---|---|
| `90000001`–`90000007` | IDs de conexão (`__IMTCONN__`) — Google, Microsoft 365, ClickUp, Kommo, iLovePDF / Connection IDs |
| `80000001`–`80000010` | IDs de webhook (`__IMTHOOK__`) — um por trigger / Webhook IDs, one per trigger |
| `YOUR_GOOGLE_SHEETS_ID` | ID da planilha Google Sheets de lookup / Google Sheets spreadsheet ID |
| `YOUR_ONEDRIVE_DRIVE_ID_*` / `YOUR_ONEDRIVE_GROUP_ID_*` | IDs de drive e grupo do OneDrive (principal + restritos) / OneDrive drive and group IDs |
| `YOUR_ONEDRIVE_ITEM_ID_N` | IDs de pastas/arquivos do OneDrive na cadeia de caminhos / OneDrive folder/file path IDs |
| `90000201` / `90000202` | ClickUp Workspace ID (`team_id`) / Space ID (`space_ids`) |
| `90000203` / `90000204` | IDs de usuário do ClickUp (assignees) / ClickUp user IDs |
| `90000101` / `90000102` | ID de pipeline Kommo / IDs de status Kommo (aprovado, desistência) — Kommo pipeline and status IDs |
| `YOUR_TALLY_FORM_ID_PASTORAL` / `YOUR_TALLY_FORM_ID_ENTREVISTA` | IDs de formulários Tally usados em links pré-preenchidos / Tally form IDs used in pre-filled links |
| `institutoaurora.org.br` | Domínio institucional fictício (substitui o domínio real) / Fictional institutional domain |
| `Instituto Aurora` / `UniParceira` | Nome fictício da instituição e de uma universidade parceira mencionada nos textos / Fictional institution and partner-university name |
| `Beatriz Andrade` | Nome fictício substituindo um colaborador real citado em e-mails / Fictional name replacing a real staff member |
| `+5500991234567` | Número de WhatsApp fictício / Fictional WhatsApp number |

Para utilizar os blueprints, substitua os valores acima pelos seus próprios (reconecte as contas Google, Microsoft 365, ClickUp, Kommo e iLovePDF pelo editor do Make.com — o próprio Make solicita a reconexão ao detectar um `__IMTCONN__`/`__IMTHOOK__` inválido).

To use the blueprints, replace the values above with your own (reconnect the Google, Microsoft 365, ClickUp, Kommo, and iLovePDF accounts in the Make.com editor — Make itself prompts for reconnection when it detects an invalid `__IMTCONN__`/`__IMTHOOK__`).

## Como importar / How to import

1. Acesse o Make.com e crie um novo cenário / Go to Make.com and create a new scenario
2. Clique nos três pontos (···) no canto superior direito / Click the three dots (···) in the top right corner
3. Selecione **Import Blueprint** / Select **Import Blueprint**
4. Faça upload do arquivo `.json` desejado / Upload the desired `.json` file
5. Reconecte as contas (Google, Microsoft 365, ClickUp, Kommo, iLovePDF) quando solicitado / Reconnect the accounts when prompted
6. Ajuste os IDs de planilha, drive/grupo do OneDrive, workspace do ClickUp e pipeline/status do Kommo para os seus / Adjust the spreadsheet, OneDrive drive/group, ClickUp workspace, and Kommo pipeline/status IDs to your own

## Ordem de implementação recomendada / Recommended implementation order

1. `01-formulario-interesse.blueprint.json`
2. `02-proposta-financeira.blueprint.json`
3. `03-formulario-inscricao.blueprint.json`
4. `04-formulario-pessoal.blueprint.json`
5. `05-formulario-pastoral.blueprint.json`
6. `06-agendar-entrevista.blueprint.json`
7. `07-parecer-entrevista.blueprint.json`
8. `08-envio-documentos.blueprint.json`
9. `09-registro-ra-declaracao.blueprint.json`
10. `10-emissao-contrato.blueprint.json`
11. `11-pagamento-confirmado.blueprint.json`
12. `12-checkin.blueprint.json`
13. `13-desistencia-candidato.blueprint.json`

## Dependências entre cenários / Inter-scenario dependencies

```
[01] → cria registro no Google Sheets (Kommo_Lead_ID)
  └─► [02] → complementa registro (Candidatos_Row_ID, ClickUp_Task_ID)
        └─► [03] → adiciona Formulario_Row_ID
              └─► [04] → adiciona Pessoal_Row_ID
              └─► [05] → adiciona Pastoral_Row_ID
                    └─► [06] → usa PDFs dos cenários 03 e 04
                          └─► [07] → usa ClickUp_Task_ID
                                └─► [08] → usa ClickUp_Task_ID
                                      └─► [09] → adiciona RA + Declaracao_File_ID
                                            └─► [10] → usa todos os dados do GSheets
                                                  └─► [11] → usa ClickUp_Task_ID
                                                        └─► [12] → usa Kommo_Lead_ID
                                                              └─► [13] → usa Kommo_Lead_ID (mudança de status)
```
