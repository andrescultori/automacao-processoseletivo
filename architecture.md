# Arquitetura Detalhada / Detailed Architecture

## Visão Geral / Overview

O sistema é construído em torno do **Make.com** como orquestrador central, conectando múltiplas ferramentas via APIs REST e webhooks. A arquitetura segue o princípio de **separação de responsabilidades**:

The system is built around **Make.com** as the central orchestrator, connecting multiple tools via REST APIs and webhooks. The architecture follows the principle of **separation of concerns**:

| Camada / Layer | Ferramenta / Tool | Responsabilidade / Responsibility |
|---|---|---|
| **Trigger** | Tally, Kommo, ClickUp | Iniciar execuções / Trigger executions |
| **Orquestração** | Make.com | Lógica de negócio / Business logic |
| **Lookup / Busca** | Google Sheets | Busca rápida de registros / Fast record lookup |
| **Registro** | Microsoft Excel | Histórico e PowerBI / History and PowerBI |
| **Tarefas** | ClickUp | Pipeline de candidatos / Candidate pipeline |
| **Documentos** | OneDrive | Armazenamento de PDFs / PDF storage |
| **CRM** | Kommo | Comunicação e leads / Communication and leads |

---

## Decisões Arquiteturais / Architectural Decisions

### 1. Google Sheets como camada de lookup

**Problema:** O conector Excel no Make.com não possui módulo de busca por valor — apenas `listWorksheetRows` que lê todas as linhas (N operações).

**Solução:** Google Sheets espelha os dados relevantes do Excel e oferece `Search Rows` com 1 operação por busca.

**Impacto:** Redução de ~80% nas operações Make.com por execução.

---

### 2. Set/Get Variable através de Aggregators

**Problema:** Após um Aggregator ou Iterator no Make.com, dados de módulos anteriores ficam inacessíveis.

**Solução:** Padrão Set Variable antes → Iterator → Get Variable depois.

```
[Set Variable] → salva valor crítico
      │
[Iterator] → processa N bundles (perde contexto anterior)
      │
[Get Variable] → recupera o valor salvo
```

---

### 3. JavaScript para campos aninhados do Kommo

**Problema:** O Kommo retorna campos customizados como array aninhado. O Make.com não consegue filtrar arrays aninhados nativamente em filtros de módulo.

**Solução:** Módulo Code (JavaScript) extrai o valor pelo `field_id` antes do filtro.

---

### 4. fieldsById em módulos Tally

**Problema:** `fields.\`Nome do Campo\`` quebra se o campo for renomeado no Tally.

**Solução:** `fieldsById.question_XXXXX` é imutável — o ID nunca muda independente de renomeações.

---

### 5. Número serial para datas no Excel

**Problema:** O Excel interpreta strings de data (`DD/MM/YYYY` vs `MM/DD/YYYY`) de forma ambígua dependendo da configuração regional do servidor Microsoft 365.

**Solução:** Enviar datas como número serial inteiro (ex: `46013` para 01/07/2026).

```
round(parseNumber(formatDate(date; "X")) / 86400 + 25569; 0)
```

---

## Fluxo de Autenticação / Authentication Flow

Todas as conexões são gerenciadas pelo Make.com via OAuth2 ou API Key:

- **Microsoft 365** (Excel, OneDrive, Outlook) → OAuth2
- **Google** (Sheets, Calendar, Drive) → OAuth2
- **Kommo** → OAuth2
- **ClickUp** → API Key
- **Tally** → API Key + Webhooks
- **iLovePDF** → API Key
- **DOCX Templater** → API Key
- **Google Gemini** → API Key

---

## Tratamento de Erros / Error Handling

- Filtros `text:equal` (nunca `text:contain`) para evitar falsos positivos
- Verificação de reprocessamento via comentários existentes no ClickUp
- Lógica de fallback por nome quando busca por e-mail falha
- Tratamento de `null` e arrays vazios em todos os módulos JavaScript
- Filtros de existência antes de módulos críticos (uploads, API calls)
