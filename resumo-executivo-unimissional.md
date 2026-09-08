# Resumo Executivo — Sistema de Automação do Processo Seletivo UniMissional

## Visão Geral

Sistema completo de automação do processo seletivo da UniMissional, instituição brasileira de ensino que oferece formação missional integrada a cursos universitários, moradia e alimentação. O projeto automatizou 12 etapas sequenciais — do primeiro contato do candidato até a confirmação de matrícula — eliminando tarefas manuais repetitivas, reduzindo erros operacionais e melhorando a experiência do candidato em cada etapa.

---

## Arquitetura do Sistema

### Plataforma de automação
**Make.com** (plano Core) como orquestrador central de todos os fluxos, conectando 10+ ferramentas via APIs e webhooks.

### Ferramentas integradas

| Categoria | Ferramenta | Uso |
|---|---|---|
| Automação | Make.com | Orquestração de todos os cenários |
| Formulários | Tally.so | Coleta de dados em todas as etapas |
| CRM | Kommo | Gestão de leads e comunicação via WhatsApp |
| Gestão de tarefas | ClickUp | Acompanhamento do processo por candidato |
| Planilhas | Microsoft Excel | Registro histórico e relatórios PowerBI |
| Banco de dados | Google Sheets | Camada de busca e lookup rápido |
| Armazenamento | Microsoft OneDrive | Documentos gerados e arquivos recebidos |
| Documentos | DOCX Templater | Geração de documentos Word a partir de templates |
| Conversão | iLovePDF | Conversão de Word para PDF |
| IA | Google Gemini API | OCR e extração de dados de documentos |
| E-mail | Microsoft Outlook 365 | Comunicações automáticas |
| Assinatura digital | ZapSign | Previsto para implementação futura |
| Pagamentos | Asaas API | Previsto para implementação futura |

### Linguagens e tecnologias utilizadas
- **JavaScript** — lógica customizada em módulos Make.com (Code) para manipulação de arrays, extração de campos aninhados de APIs, conversão de valores para extenso em português, tratamento de URLs e parsing de dados
- **RegEx** — extração de dados via Text Parser do Make.com
- **JSON** — comunicação com APIs REST (Kommo, ClickUp, Microsoft Graph)
- **Fórmulas Google Sheets** — cálculo de métricas e formatação de dados

---

## Os 12 Cenários Implementados

### Cenário 00 — Formulário de Interesse
**Trigger:** Webhook do site institucional

Quando o candidato preenche o formulário de interesse no site, o sistema verifica se já existe um contato no Kommo pelo número de telefone. Se novo, cria contato e lead automaticamente. Se existente, cria novo lead vinculado ao contato e registra uma nota. Paralelamente, envia e-mail personalizado com eBook em anexo (hospedado no Google Drive) com informações sobre a UniMissional, nome do candidato e cursos de interesse.

**Destaques técnicos:**
- Formatação automática de telefone brasileiro com adição do nono dígito
- Lógica de deduplicação de contatos no Kommo
- Registro no Google Sheets com Contact ID e Lead ID do Kommo

---

### Cenário 01 — Envio da Proposta Financeira
**Trigger:** Resposta no Tally (formulário interno da equipe)

Gera automaticamente uma proposta financeira personalizada em PDF e a envia ao candidato por e-mail. Cria uma tarefa no ClickUp com subtarefas para acompanhamento do processo. Registra o candidato no Excel e no Google Sheets. Implementa busca dupla (e-mail + nome) para evitar registros duplicados quando a equipe usa e-mails diferentes para o mesmo candidato.

**Destaques técnicos:**
- Geração de documento Word via DOCX Templater com variáveis dinâmicas
- Conversão automática de valores monetários para extenso em português via JavaScript
- Conversão DOCX → PDF via iLovePDF
- Upload automático no OneDrive com preservação do File ID
- Set/Get Variable para preservar dados através de Aggregators
- Busca no Kommo para vincular Contact ID e Lead ID ao registro do candidato

---

### Cenário 02 — Formulário de Inscrição
**Trigger:** Resposta no Tally (candidato)

Processa o formulário principal de inscrição com dados pessoais, familiares e de emergência. Envia automaticamente e-mail ao pastor do candidato com link para o formulário pastoral pré-preenchido. Gera PDF do formulário preenchido via DOCX Templater e envia ao candidato para conferência. Atualiza Excel, Google Sheets e ClickUp. Distingue entre primeiro preenchimento e repreenchimento.

**Destaques técnicos:**
- Lógica de roteamento por `Formulario_Row_ID` para distinguir novo vs existente
- Subtarefas do ClickUp marcadas como concluídas via Feeder único com filtro por nome
- E-mail automático ao pastor com link pré-preenchido

---

### Cenário 03 — Formulário Pessoal
**Trigger:** Resposta no Tally (candidato)

Registra informações confidenciais do candidato acessíveis apenas pela coordenação e mentor. Grava em planilha separada no Excel. Gera PDF do formulário e envia ao candidato para conferência. Atualiza Google Sheets com o File ID do PDF para uso posterior.

**Destaques técnicos:**
- Planilha separada com acesso restrito à coordenação
- Busca no Google Sheets por e-mail para identificação do candidato
- PDF arquivado no OneDrive com link disponível para o cenário de Agendar Entrevista

---

### Cenário 04 — Formulário Pastoral
**Trigger:** Resposta no Tally (pastor)

Processa o formulário preenchido pelo pastor de referência do candidato. Grava na planilha de coordenação, gera PDF e atualiza a tarefa no ClickUp. Envia e-mail de agradecimento ao pastor após o preenchimento, usando o e-mail armazenado no Google Sheets.

**Destaques técnicos:**
- Busca por CPF normalizado (somente números) para identificação do candidato
- E-mail de agradecimento ao pastor usando campo sincronizado do Google Sheets
- Cenário avulso de uso único para popular campo `Email_Pastor` em registros existentes

---

### Cenário 05 — Agendar Entrevista
**Trigger:** Webhook do Kommo (campo customizado "Agendar Entrevista" = true)

Quando a equipe marca o campo no Kommo indicando que os formulários foram preenchidos, o cenário envia ao mentor os PDFs do Formulário de Inscrição e Formulário Pessoal por e-mail, para preparação da entrevista. Inclui link do WhatsApp do candidato pré-configurado e link do formulário de parecer pré-preenchido.

**Destaques técnicos:**
- JavaScript para extrair valores de campos customizados aninhados do Kommo (array `custom_fields[]`)
- Busca no Google Sheets por `Kommo_Lead_ID` — padrão estabelecido e replicado nos cenários seguintes
- Filtro baseado no valor do campo customizado extraído pelo JavaScript

---

### Cenário 06 — Parecer da Entrevista
**Trigger:** Resposta no Tally (mentor)

Após a entrevista, o mentor preenche o formulário de parecer. O cenário registra o resultado no Excel, atualiza a tarefa no ClickUp e gera PDF do parecer. Com base no resultado (aprovado/reprovado), segue rotas diferentes: aprovado move o lead no Kommo via API; reprovado posta comentário urgente no ClickUp notificando a equipe.

**Destaques técnicos:**
- Router condicional baseado no resultado do parecer
- Atualização do status do lead no Kommo via `Make an API Call` com PATCH (`/v4/leads`)
- Endpoint Kommo sem prefixo `/api` — padrão estabelecido para todos os cenários

---

### Cenário 07 — Envio de Documentos
**Trigger:** Resposta no Tally (candidato)

Recebe até 9 documentos diferentes (RG, CPF, CNH, Certidão de Casamento etc.) enviados pelo candidato. Cria pasta personalizada no OneDrive, faz download de cada arquivo via HTTP e realiza upload organizado por tipo de documento. Atualiza subtarefas no ClickUp.

**Destaques técnicos:**
- JavaScript para montar array dinâmico de URLs válidas — filtra campos vazios e valida presença de `accessToken` na URL do Tally
- Tratamento de múltiplos arquivos por campo (candidato pode enviar mais de uma imagem por documento)
- Iterator substituindo 9 rotas fixas paralelas — redução de 18 módulos para 4
- Set/Get Variable para preservar o caminho da pasta através do Iterator
- Router antes do Iterator para separar o fluxo de uploads do fluxo do ClickUp

---

### Cenário 08 — Registro do RA e Declaração de Convênio
**Trigger:** Webhook do Kommo (campo customizado "RA" preenchido)

Quando o bot do Kommo captura o Registro Acadêmico informado pelo candidato, o cenário grava o RA no Excel e no Google Sheets. Paralelamente, gera automaticamente a Declaração de Convênio em PDF usando o RA e dados do candidato, faz upload no OneDrive e registra o File ID. Atualiza a subtarefa correspondente no ClickUp.

**Destaques técnicos:**
- JavaScript para extrair campo customizado por `field_id` (1014338) do array aninhado do Kommo
- Número serial do Excel para gravação de datas sem ambiguidade de formato regional (`round(parseNumber(timestamp) / 86400 + 25569; 0)`)
- Router com 3 rotas paralelas: gravação Excel/Google Sheets, geração PDF, atualização ClickUp

---

### Cenário 09 — Emissão de Contrato
**Trigger:** ClickUp Watch Tasks Polling (subtarefa "Contrato e Requerimento" em progresso)

Gera o contrato e requerimento em PDF usando dados completos do candidato buscados no Google Sheets. Faz upload no OneDrive. Envia ao financeiro por e-mail com o contrato e a proposta financeira em anexo para emissão do boleto da primeira mensalidade. Atualiza a subtarefa e registra os File IDs.

**Destaques técnicos:**
- Busca direta por `ClickUp_Task_ID` no Google Sheets (`{{74.parent}}`), eliminando módulos de Get Task e Text Parser com regex
- JavaScript unificado para converter dois valores para extenso em português (valor monetário e percentual de desconto)
- Set/Get Variable para preservar File ID do contrato entre rotas paralelas do Router

---

### Cenário 10 — Pagamento Confirmado
**Trigger:** ClickUp Watch Tasks Polling (subtarefa de pagamento em progresso)

Quando o financeiro confirma o pagamento da primeira mensalidade, o cenário atualiza o Excel com status "Matriculado", marca a subtarefa como concluída no ClickUp, posta comentário com data e realiza troca de tags no lead do ClickUp para rastreabilidade no pipeline.

**Destaques técnicos:**
- Busca no Google Sheets por `ClickUp_Task_ID` via `{{2.parent}}`
- Troca de tags no ClickUp para rastreabilidade de pipeline

---

### Cenário 11 — Check-in
**Trigger:** Webhook do Kommo (campo customizado de check-in = true)

Quando o aluno chega fisicamente à UniMissional e confirma pelo bot do Kommo, o cenário registra o check-in na planilha de alunos, atualiza a subtarefa no ClickUp, posta comentário com data e realiza troca de tags.

**Destaques técnicos:**
- JavaScript para extrair campo customizado do Kommo — mesmo padrão dos cenários 05 e 08
- Aggregator com campo `status` incluído para eliminar módulo `getATask` desnecessário
- Filtro por status diretamente no Feeder, reduzindo operações

---

## Otimizações Transversais Implementadas

### Arquitetura de dados
- **Migração Data Store → Airtable → Google Sheets** como camada de lookup — eliminando `listWorksheetRows` custoso em favor de `Search Rows` com 1 operação
- **Padrão Set/Get Variable** para preservar dados através de Aggregators e Iterators
- **Campos por `fieldsById`** em todos os módulos Tally para robustez contra renomeações

### Redução de operações
- Substituição de `listWorksheetRows` (N operações) por Google Sheets `Search Rows` (1 operação) em todos os cenários
- Iterator único substituindo múltiplas rotas fixas paralelas no cenário de documentos
- Eliminação de módulos redundantes (`getATask`, `SetVariable` intermediários, `ActionReadLead`)

### Robustez e tratamento de erros
- Filtros `text:equal` em substituição a `text:contain` para evitar falsos positivos
- Verificação de reprocessamento via comentários existentes
- Lógica de fallback por nome quando busca por e-mail falha
- Tratamento de campos nulos e arrays vazios em todos os módulos JavaScript
- Número serial para datas no Excel eliminando ambiguidade de formato regional

### Padrões JavaScript estabelecidos
- Extração de campos customizados aninhados do Kommo por `field_id`
- Conversão de valores para extenso em português (reais e percentual)
- Montagem de arrays dinâmicos com filtragem de URLs válidas
- Tratamento de múltiplos arquivos por campo de upload

---

## Métricas do Projeto

- **12 cenários** de automação implementados e otimizados
- **10+ ferramentas** integradas via API
- **Redução estimada de ~80%** nas operações Make.com por execução após otimizações
- **100% do processo seletivo** automatizado — do primeiro contato ao check-in
- **Zero intervenção manual** nas etapas de geração de documentos, comunicações e registros

---

## Impacto Operacional

- Eliminação de registro manual de dados em múltiplos sistemas
- Comunicações automáticas e personalizadas em cada etapa do processo
- Rastreabilidade completa do candidato no ClickUp, Excel e Google Sheets
- Documentos gerados e arquivados automaticamente no OneDrive
- Equipe focada em relacionamento e decisões, não em tarefas administrativas
