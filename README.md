# 🎓 Automação do Processo Seletivo — UniMissional
### Automation of the Admissions Process — UniMissional

<div align="center">

[![Make.com](https://img.shields.io/badge/Make.com-6D00CC?style=for-the-badge&logo=make&logoColor=white)](https://make.com)
[![Google Sheets](https://img.shields.io/badge/Google_Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)](https://sheets.google.com)
[![Microsoft 365](https://img.shields.io/badge/Microsoft_365-D83B01?style=for-the-badge&logo=microsoft&logoColor=white)](https://microsoft.com/365)
[![ClickUp](https://img.shields.io/badge/ClickUp-7B68EE?style=for-the-badge&logo=clickup&logoColor=white)](https://clickup.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Autor / Author:** [André Scultori](https://github.com/amscultori)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrescultori)

**Período / Period:** Março 2025 — Setembro 2026

</div>

---

## 🇧🇷 Português

### Visão Geral

Sistema completo de automação do processo seletivo da **UniMissional**, instituição brasileira de ensino que oferece formação missional integrada a cursos universitários, com moradia e alimentação. O projeto automatizou **12 etapas sequenciais** — do primeiro contato do candidato até a confirmação de matrícula — eliminando tarefas manuais repetitivas, reduzindo erros operacionais e melhorando a experiência do candidato em cada etapa.

### Problema

Antes da automação, o processo seletivo era inteiramente manual:
- Dados de candidatos registrados em planilhas por colaboradores
- Documentos gerados manualmente um a um
- Comunicações enviadas individualmente para cada candidato
- Nenhuma rastreabilidade centralizada do pipeline de candidatos
- Alto risco de erros humanos e perda de informações

### Solução

Ecossistema de automação integrado conectando 10+ ferramentas via APIs e webhooks, cobrindo 100% do processo seletivo de forma automatizada.

### Resultados

- ✅ **100%** do processo seletivo automatizado — do primeiro contato ao check-in
- ✅ **~80%** de redução no consumo de operações após otimizações arquiteturais
- ✅ **Zero intervenção manual** em geração de documentos, comunicações e registros
- ✅ Rastreabilidade completa do candidato em múltiplos sistemas simultaneamente
- ✅ Experiência do candidato significativamente melhorada com comunicações personalizadas

---

## 🇺🇸 English

### Overview

A complete automation system for the **UniMissional** admissions process — a Brazilian educational institution offering missional formation integrated with university degrees, housing, and meals. The project automated **12 sequential stages** — from the candidate's first contact to enrollment confirmation — eliminating repetitive manual tasks, reducing operational errors, and improving the candidate experience at every stage.

### Problem

Before automation, the admissions process was entirely manual:
- Candidate data recorded in spreadsheets by staff members
- Documents generated one by one manually
- Communications sent individually to each candidate
- No centralized pipeline tracking for candidates
- High risk of human error and lost information

### Solution

An integrated automation ecosystem connecting 10+ tools via APIs and webhooks, covering 100% of the admissions process automatically.

### Results

- ✅ **100%** of the admissions process automated — from first contact to check-in
- ✅ **~80%** reduction in operation consumption after architectural optimizations
- ✅ **Zero manual intervention** in document generation, communications, and records
- ✅ Complete candidate traceability across multiple systems simultaneously
- ✅ Significantly improved candidate experience with personalized communications

---

## 🛠️ Stack Tecnológica / Tech Stack

| Categoria / Category | Ferramenta / Tool | Uso / Usage |
|---|---|---|
| **Automação / Automation** | Make.com | Orquestração central de todos os fluxos / Central orchestration of all flows |
| **Formulários / Forms** | Tally.so | Coleta de dados em todas as etapas / Data collection at all stages |
| **CRM** | Kommo | Gestão de leads e WhatsApp / Lead management and WhatsApp |
| **Gestão de Tarefas / Task Management** | ClickUp | Acompanhamento por candidato / Per-candidate tracking |
| **Planilhas / Spreadsheets** | Microsoft Excel | Registro histórico e PowerBI / Historical records and PowerBI |
| **Banco de Dados / Database** | Google Sheets | Camada de lookup rápido / Fast lookup layer |
| **Armazenamento / Storage** | Microsoft OneDrive | Documentos e arquivos / Documents and files |
| **Documentos / Documents** | DOCX Templater | Geração de documentos Word / Word document generation |
| **Conversão / Conversion** | iLovePDF | Conversão DOCX → PDF / DOCX → PDF conversion |
| **Inteligência Artificial / AI** | Google Gemini API | OCR e extração de dados / OCR and data extraction |
| **E-mail** | Microsoft Outlook 365 | Comunicações automáticas / Automated communications |
| **E-assinatura / E-signature** | ZapSign | Previsto / Planned |
| **Pagamentos / Payments** | Asaas API | Previsto / Planned |

### Linguagens e Tecnologias / Languages and Technologies

- **JavaScript** — Lógica customizada nos módulos Make.com para manipulação de arrays, extração de campos aninhados de APIs, conversão de valores para extenso em pt-BR, tratamento de URLs e parsing de dados
- **RegEx** — Extração de dados via Text Parser do Make.com
- **JSON** — Comunicação com APIs REST (Kommo, ClickUp, Microsoft Graph)
- **Fórmulas Google Sheets** — Cálculo de métricas e formatação de dados

---

## 🔄 Arquitetura dos Cenários / Scenario Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PROCESSO SELETIVO UNIMISSIONAL                │
│                   UNIMISSIONAL ADMISSIONS PROCESS                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [00] Formulário de Interesse ──► Kommo + E-mail + Google Sheets │
│       Interest Form                                               │
│           │                                                       │
│  [01] Proposta Financeira ──────► Excel + ClickUp + PDF + E-mail │
│       Financial Proposal                                          │
│           │                                                       │
│  [02] Formulário de Inscrição ──► Excel + GSheets + PDF + E-mail │
│       Enrollment Form                                             │
│           │                                                       │
│  [03] Formulário Pessoal ───────► Excel + GSheets + PDF + E-mail │
│       Personal Form                                               │
│           │                                                       │
│  [04] Formulário Pastoral ──────► Excel + GSheets + PDF + E-mail │
│       Pastoral Form                                               │
│           │                                                       │
│  [05] Agendar Entrevista ───────► E-mail Mentor                  │
│       Schedule Interview                                          │
│           │                                                       │
│  [06] Parecer da Entrevista ────► ClickUp + Kommo + PDF          │
│       Interview Assessment                                        │
│           │                                                       │
│  [07] Envio de Documentos ──────► OneDrive + ClickUp             │
│       Document Submission                                         │
│           │                                                       │
│  [08] Registro RA + Declaração ─► Excel + GSheets + PDF          │
│       RA Registration + Declaration                               │
│           │                                                       │
│  [09] Emissão de Contrato ──────► PDF + OneDrive + E-mail        │
│       Contract Generation                                         │
│           │                                                       │
│  [10] Pagamento Confirmado ─────► Excel + ClickUp                │
│       Payment Confirmed                                           │
│           │                                                       │
│  [11] Check-in ─────────────────► Excel + ClickUp                │
│       Check-in                                                    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Fluxo de Dados / Data Flow

```
Tally / Kommo / ClickUp (Triggers)
         │
         ▼
    Make.com (Orquestração)
         │
    ┌────┴────────────────────────────────┐
    │                                     │
    ▼                                     ▼
Google Sheets                      Microsoft Excel
(Lookup / Validação)               (Registro histórico)
    │                                     │
    └────────────┬────────────────────────┘
                 │
         ┌───────┴────────┐
         │                │
         ▼                ▼
    OneDrive           ClickUp
    (Documentos)       (Tarefas)
         │
         ▼
    DOCX Templater → iLovePDF → PDF Final
```

---

## 📋 Descrição dos Cenários / Scenario Descriptions

### 00 — Formulário de Interesse / Interest Form
**Trigger:** Webhook do site / Website webhook

Verifica duplicatas no Kommo por telefone. Se novo candidato: cria contato e lead. Se existente: cria novo lead vinculado. Envia e-mail personalizado com eBook.

Checks for duplicates in Kommo by phone number. If new candidate: creates contact and lead. If existing: creates new linked lead. Sends personalized email with eBook.

**Destaques / Highlights:** Formatação automática de telefone brasileiro (9º dígito) · Deduplicação de contatos no Kommo · Registro no Google Sheets

---

### 01 — Proposta Financeira / Financial Proposal
**Trigger:** Tally (equipe interna / internal team)

Gera proposta em PDF com DOCX Templater + iLovePDF. Cria tarefa no ClickUp com subtarefas. Registra no Excel e Google Sheets. Busca dupla (e-mail + nome) para evitar duplicatas.

Generates PDF proposal via DOCX Templater + iLovePDF. Creates ClickUp task with subtasks. Records in Excel and Google Sheets. Dual search (email + name) to prevent duplicates.

**Destaques / Highlights:** JavaScript para valores por extenso em pt-BR · Set/Get Variable através de Aggregators · Vinculação automática ao CRM

---

### 02 — Formulário de Inscrição / Enrollment Form
**Trigger:** Tally (candidato / candidate)

Processa dados pessoais e familiares. E-mail automático ao pastor com link pré-preenchido. Gera PDF e envia ao candidato. Distingue primeiro preenchimento de repreenchimento.

Processes personal and family data. Automatic email to pastor with pre-filled link. Generates PDF and sends to candidate. Distinguishes first fill from refill.

**Destaques / Highlights:** Roteamento por `Formulario_Row_ID` · Subtarefas do ClickUp via Feeder único · E-mail automático ao pastor

---

### 03 — Formulário Pessoal / Personal Form
**Trigger:** Tally (candidato / candidate)

Registra dados confidenciais em planilha restrita à coordenação. Gera PDF e envia ao candidato. Salva File ID no Google Sheets para uso posterior.

Records confidential data in coordinator-only spreadsheet. Generates PDF and sends to candidate. Saves File ID in Google Sheets for later use.

---

### 04 — Formulário Pastoral / Pastoral Form
**Trigger:** Tally (pastor)

Processa formulário do pastor de referência. Gera PDF. E-mail de agradecimento ao pastor usando e-mail sincronizado do Google Sheets.

Processes reference pastor's form. Generates PDF. Thank-you email to pastor using email synced from Google Sheets.

**Destaques / Highlights:** Busca por CPF normalizado · Cenário avulso de sincronização de dados históricos

---

### 05 — Agendar Entrevista / Schedule Interview
**Trigger:** Webhook Kommo (campo customizado / custom field)

JavaScript extrai campo customizado aninhado do Kommo. Envia PDFs dos formulários ao mentor por e-mail. Link do WhatsApp e formulário de parecer pré-preenchidos.

JavaScript extracts nested custom field from Kommo. Sends form PDFs to mentor by email. Pre-filled WhatsApp link and assessment form.

**Destaques / Highlights:** Padrão JavaScript para campos aninhados do Kommo · Busca por `Kommo_Lead_ID` no Google Sheets

---

### 06 — Parecer da Entrevista / Interview Assessment
**Trigger:** Tally (mentor)

Router condicional por resultado (aprovado/reprovado). Aprovado: move lead no Kommo via API PATCH. Reprovado: comentário urgente no ClickUp.

Conditional router by result (approved/rejected). Approved: moves lead in Kommo via API PATCH. Rejected: urgent comment in ClickUp.

**Destaques / Highlights:** API Kommo via Make an API Call · Endpoint `/v4/leads` sem prefixo `/api`

---

### 07 — Envio de Documentos / Document Submission
**Trigger:** Tally (candidato / candidate)

Recebe até 9 documentos. JavaScript monta array dinâmico de URLs válidas. Iterator substitui 9 rotas fixas (18 módulos → 4). Cria pasta no OneDrive e organiza arquivos por tipo.

Receives up to 9 documents. JavaScript builds dynamic array of valid URLs. Iterator replaces 9 fixed routes (18 modules → 4). Creates OneDrive folder and organizes files by type.

**Destaques / Highlights:** Iterator dinâmico · Tratamento de múltiplos arquivos por campo · Validação de `accessToken` na URL

---

### 08 — Registro RA + Declaração / RA Registration + Declaration
**Trigger:** Webhook Kommo (campo customizado / custom field)

Extrai RA via JavaScript por `field_id`. Gera Declaração de Convênio em PDF com o RA. 3 rotas paralelas: Excel/GSheets, PDF, ClickUp.

Extracts RA via JavaScript by `field_id`. Generates Covenant Declaration PDF with RA. 3 parallel routes: Excel/GSheets, PDF, ClickUp.

**Destaques / Highlights:** Número serial Excel para datas sem ambiguidade regional · `round(parseNumber(timestamp) / 86400 + 25569; 0)`

---

### 09 — Emissão de Contrato / Contract Generation
**Trigger:** ClickUp Watch Tasks Polling

Busca dados no Google Sheets por `ClickUp_Task_ID` direto (elimina Get Task + Text Parser). Gera contrato em PDF. Envia ao financeiro com proposta em anexo.

Fetches data from Google Sheets by `ClickUp_Task_ID` directly (eliminates Get Task + Text Parser). Generates contract PDF. Sends to finance team with proposal attached.

**Destaques / Highlights:** JavaScript unificado para extenso em pt-BR (moeda + percentual) · Set/Get Variable entre rotas paralelas

---

### 10 — Pagamento Confirmado / Payment Confirmed
**Trigger:** ClickUp Watch Tasks Polling

Atualiza Excel com status "Matriculado". Marca subtarefa no ClickUp. Troca de tags para rastreabilidade de pipeline.

Updates Excel with "Enrolled" status. Marks ClickUp subtask. Tag swap for pipeline traceability.

---

### 11 — Check-in
**Trigger:** Webhook Kommo (campo customizado / custom field)

Registra check-in na planilha de alunos. Atualiza ClickUp. Aggregator com campo `status` elimina módulo `getATask` desnecessário.

Records check-in in student spreadsheet. Updates ClickUp. Aggregator with `status` field eliminates unnecessary `getATask` module.

---

## ⚙️ Otimizações Arquiteturais / Architectural Optimizations

### Arquitetura de Dados / Data Architecture

```
ANTES / BEFORE:
Excel listWorksheetRows → N operações por execução
                          N operations per execution

DEPOIS / AFTER:
Google Sheets Search Rows → 1 operação por execução
                             1 operation per execution

Redução / Reduction: ~80% nas operações Make.com
```

### Padrões Estabelecidos / Established Patterns

**1. Set/Get Variable através de Aggregators**
```
Set Variable (antes do Iterator/Aggregator)
     │
Iterator → processa N bundles
     │
Get Variable (após o Iterator — preserva o valor)
```

**2. JavaScript para campos aninhados do Kommo**
```javascript
// Extrai campo customizado por field_id do array aninhado
const fields = Array.isArray(input.fields) ? input.fields : [input.fields];
const field = fields.find(f =>
  f !== null && f !== undefined &&
  String(f.id) === String(input.field_id)
);
const value = field?.values?.[0]?.value ?? null;
```

**3. Número serial para datas no Excel**
```javascript
// Evita ambiguidade de formato regional (DD/MM vs MM/DD)
round(parseNumber(formatDate(date; "X")) / 86400 + 25569; 0)
```

**4. Iterator dinâmico substituindo rotas fixas**
```
ANTES / BEFORE: 9 rotas fixas = 18 módulos
DEPOIS / AFTER: JavaScript + Iterator = 4 módulos
```

**5. fieldsById em módulos Tally**
```
// Robusto a renomeações de campos
{{fieldsById.question_XXXXX}}  ✅
{{fields.`Nome do Campo`}}     ❌ (quebra se renomear)
```

---

## 📁 Estrutura do Repositório / Repository Structure

```
automacao-processoseletivo/
│
├── README.md                          # Este arquivo / This file
│
├── docs/
│   ├── architecture.md                # Arquitetura detalhada / Detailed architecture
│   ├── data-flow.md                   # Fluxo de dados / Data flow
│   ├── google-sheets-schema.md        # Schema do Google Sheets
│   └── optimizations.md               # Log de otimizações / Optimization log
│
├── scripts/
│   ├── kommo-extract-custom-field.js  # Extração de campos do Kommo
│   ├── number-to-words-ptbr.js        # Valores por extenso em pt-BR
│   ├── dynamic-url-array.js           # Array dinâmico de URLs (documentos)
│   ├── excel-date-serial.js           # Número serial para datas Excel
│   ├── tally-dropdown-update.js       # Atualização de dropdown Tally via API
│   └── gemini-csv-parser.js           # Parser de CSV retornado pelo Gemini
│
├── schemas/
│   ├── google-sheets-candidatos.md    # Estrutura da planilha de candidatos
│   └── clickup-task-template.md       # Template de tarefas no ClickUp
│
└── blueprints/
    ├── README.md                      # Como importar os blueprints
    ├── 00-formulario-interesse.json
    ├── 01-proposta-financeira.json
    ├── 02-formulario-inscricao.json
    ├── 03-formulario-pessoal.json
    ├── 04-formulario-pastoral.json
    ├── 05-agendar-entrevista.json
    ├── 06-parecer-entrevista.json
    ├── 07-envio-documentos.json
    ├── 08-registro-ra-declaracao.json
    ├── 09-emissao-contrato.json
    ├── 10-pagamento-confirmado.json
    └── 11-checkin.json
```

---

## 🔒 Segurança e Privacidade / Security and Privacy

Os blueprints neste repositório foram sanitizados — todos os dados sensíveis foram removidos:

The blueprints in this repository have been sanitized — all sensitive data has been removed:

- ❌ IDs de contas e workbooks / Account and workbook IDs
- ❌ Tokens de API / API tokens
- ❌ IDs de pastas e arquivos / Folder and file IDs
- ❌ IDs de listas e tarefas do ClickUp / ClickUp list and task IDs
- ❌ IDs de formulários Tally / Tally form IDs
- ❌ Dados de candidatos / Candidate data

Para utilizar os blueprints, substitua os valores marcados com `YOUR_*` pelas suas credenciais.

To use the blueprints, replace values marked with `YOUR_*` with your own credentials.

---

## 📸 Screenshots

> _Adicionar screenshots dos cenários no Make.com, planilhas e documentos gerados_
> _Add screenshots of Make.com scenarios, spreadsheets, and generated documents_

---

## 📄 Licença / License

Este projeto é privado e desenvolvido exclusivamente para a UniMissional.
O código e a arquitetura são compartilhados para fins de portfólio.

This project is private and developed exclusively for UniMissional.
The code and architecture are shared for portfolio purposes.

---

<div align="center">

Desenvolvido por / Developed by **[André Scultori](https://github.com/amscultori)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrescultori)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amscultori)

</div>
