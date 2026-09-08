# Log de Otimizações / Optimization Log

Registro das principais decisões de otimização tomadas ao longo do desenvolvimento.
Record of key optimization decisions made throughout development.

---

## 1. Migração Data Store → Airtable → Google Sheets

**Problema:** O Make Data Store não permitia queries complexas. O Airtable adicionava um serviço externo desnecessário.

**Solução:** Google Sheets como camada de lookup — `Search Rows` com filtro direto por coluna.

**Impacto:** -80% de operações por execução nos cenários com busca de candidatos.

---

## 2. Iterator substituindo 9 rotas fixas (Cenário 07)

**Problema:** 9 rotas paralelas fixas para upload de documentos = 18 módulos. Documentos opcionais causavam erros silenciosos.

**Solução:** JavaScript monta array dinâmico de URLs válidas → Iterator processa uma por vez.

**Impacto:** 18 módulos → 4 módulos. Suporte a campos opcionais e múltiplos arquivos por campo.

---

## 3. Busca por ClickUp_Task_ID eliminando Get Task + Text Parser (Cenário 09)

**Problema:** O cenário buscava o e-mail do candidato extraindo via regex do `text_content` da task no ClickUp (módulos `getATask` + `regexp:Parser`).

**Solução:** Busca direta no Google Sheets por `ClickUp_Task_ID` usando `{{watchTasks.parent}}`.

**Impacto:** -2 operações por execução. Eliminação de lógica frágil com regex.

---

## 4. Aggregator com campo `status` eliminando getATask (Cenário 11)

**Problema:** `listSubtasksForATask` não retorna o status — era necessário um `getATask` adicional para verificar se a subtarefa já estava concluída.

**Solução:** Adicionar `status: {{23.status.status}}` no mapper do Aggregator. O status fica disponível diretamente no Feeder.

**Impacto:** -1 operação por subtarefa iterada.

---

## 5. Número serial para datas no Excel

**Problema:** Strings de data causavam ambiguidade regional (`01/07` interpretado como 7 de janeiro em vez de 1 de julho).

**Solução:** Converter para número serial inteiro antes de enviar ao Excel.

**Fórmula:** `round(parseNumber(formatDate(date; "X")) / 86400 + 25569; 0)`

**Impacto:** Eliminação de erros de data em todos os cenários com gravação no Excel.

---

## 6. fieldsById em módulos Tally

**Problema:** `fields.\`Nome do Campo\`` quebrava silenciosamente se o campo fosse renomeado no Tally. Também retornava valores incorretos com o módulo `tally:watchNewResponse`.

**Solução:** Uso exclusivo de `fieldsById.question_XXXXX` em todos os módulos.

**Impacto:** Robustez contra renomeações. Compatibilidade garantida com o trigger nativo do Tally.

---

## 7. text:equal substituindo text:contain em filtros

**Problema:** Filtros com `text:contain` podiam retornar falsos positivos — ex: subtarefa "Formulário de Inscrição 2" sendo afetada por filtro de "Formulário de Inscrição".

**Solução:** Substituição sistemática de `text:contain` por `text:equal` em todos os filtros de subtarefas.

**Impacto:** Eliminação de falsos positivos em todos os cenários.

---

## 8. Padrão Set/Get Variable através de Aggregators

**Problema:** Após um Aggregator ou Iterator, referências a módulos anteriores ficam inacessíveis.

**Solução:** Set Variable antes do Iterator → Get Variable após, preservando valores críticos (folder path, file IDs, etc.).

**Impacto:** Eliminação de erros de mapeamento após Iterators em múltiplos cenários.

---

## 9. JavaScript unificado para extenso pt-BR (Cenário 09)

**Problema:** Dois módulos JavaScript separados para converter valor monetário e percentual de desconto para extenso.

**Solução:** Um único módulo com dois inputs e dois outputs.

**Impacto:** -1 operação por execução do cenário de contrato.

---

## 10. Atualização dinâmica de dropdown no Tally via API

**Problema:** Dropdowns do Tally precisavam ser atualizados manualmente quando a lista de alunos mudava.

**Solução:** Cenário Make.com que faz GET do formulário, localiza o dropdown pelo nome do campo, substitui as opções e faz PATCH com o array completo de blocks.

**Impacto:** Zero intervenção manual para manter dropdowns atualizados.
