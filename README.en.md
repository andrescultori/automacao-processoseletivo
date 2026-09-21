# 🎓 Admissions Process Automation — UniMissional

<div align="center">

[![Make.com](https://img.shields.io/badge/Make.com-6D00CC?style=for-the-badge&logo=make&logoColor=white)](https://make.com)
[![Google Sheets](https://img.shields.io/badge/Google_Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)](https://sheets.google.com)
[![Microsoft 365](https://img.shields.io/badge/Microsoft_365-D83B01?style=for-the-badge&logo=microsoft&logoColor=white)](https://microsoft.com/365)
[![ClickUp](https://img.shields.io/badge/ClickUp-7B68EE?style=for-the-badge&logo=clickup&logoColor=white)](https://clickup.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Author:** [André Scultori](https://github.com/amscultori)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrescultori)

**Period:** March 2025 — September 2026

🇧🇷 [Leia em Português](README.md)

</div>

---

## Overview

A complete automation system for the **UniMissional** admissions process — a Brazilian educational institution offering missional formation integrated with university degrees, housing, and meals. The project automated **13 sequential scenarios** — from the candidate's first contact to enrollment confirmation — eliminating repetitive manual tasks, reducing operational errors, and improving the candidate experience at every stage.

## Problem

Before automation, the admissions process was entirely manual:
- Candidate data recorded in spreadsheets by staff members
- Documents generated one by one manually
- Communications sent individually to each candidate
- No centralized pipeline tracking for candidates
- High risk of human error and lost information

## Solution

An integrated automation ecosystem connecting 10+ tools via APIs and webhooks, covering 100% of the admissions process automatically.

## Results

- ✅ **100%** of the admissions process automated — from first contact to check-in
- ✅ **~80%** reduction in operation consumption after architectural optimizations
- ✅ **Zero manual intervention** in document generation, communications, and records
- ✅ Complete candidate traceability across multiple systems simultaneously
- ✅ Significantly improved candidate experience with personalized communications

---

## 🛠️ Tech Stack

| Category | Tool | Usage |
|---|---|---|
| **Automation** | Make.com | Central orchestration of all flows |
| **Forms** | Tally.so | Data collection at all stages |
| **CRM** | Kommo | Lead management and WhatsApp communication |
| **Task Management** | ClickUp | Per-candidate tracking |
| **Spreadsheets** | Microsoft Excel | Historical records and PowerBI reports |
| **Database** | Google Sheets | Fast lookup layer |
| **Storage** | Microsoft OneDrive | Generated documents and files |
| **Documents** | DOCX Templater | Word document generation from templates |
| **Conversion** | iLovePDF | DOCX → PDF conversion |
| **Email** | Microsoft Outlook 365 | Automated communications |
| **E-signature** | ZapSign | Planned for future implementation |

### Languages and Technologies

- **JavaScript** — Custom logic in Make.com Code modules: array manipulation, nested API field extraction, number-to-words conversion in Portuguese, URL handling and data parsing
- **RegEx** — Data extraction via Make.com Text Parser
- **JSON** — REST API communication (Kommo, ClickUp, Microsoft Graph)
- **Google Sheets Formulas** — Metrics calculation and data formatting

---

## 🔄 Scenario Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   UNIMISSIONAL ADMISSIONS PROCESS                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [01] Interest Form ────────────► Kommo + Email + Google Sheets  │
│           │                                                       │
│  [02] Financial Proposal ───────► Excel + ClickUp + PDF + Email  │
│           │                                                       │
│  [03] Enrollment Form ──────────► Excel + GSheets + PDF + Email  │
│           │                                                       │
│  [04] Personal Form ────────────► Excel + GSheets + PDF + Email  │
│           │                                                       │
│  [05] Pastoral Form ────────────► Excel + GSheets + PDF + Email  │
│           │                                                       │
│  [06] Schedule Interview ───────► Email to Mentor                │
│           │                                                       │
│  [07] Interview Assessment ─────► ClickUp + Kommo + PDF          │
│           │                                                       │
│  [08] Document Submission ──────► OneDrive + ClickUp             │
│           │                                                       │
│  [09] RA Registration + Declaration ► Excel + GSheets + PDF      │
│           │                                                       │
│  [10] Contract Generation ──────► PDF + OneDrive + Email         │
│           │                                                       │
│  [11] Payment Confirmed ────────► Excel + ClickUp                │
│           │                                                       │
│  [12] Check-in ─────────────────► Excel + ClickUp                │
│           │                                                       │
│  [13] Candidate Withdrawal ─────► ClickUp + Excel                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
Tally / Kommo / ClickUp (Triggers)
         │
         ▼
    Make.com (Orchestration)
         │
    ┌────┴──────────────────────────────┐
    │                                   │
    ▼                                   ▼
Google Sheets                    Microsoft Excel
(Lookup / Validation)            (Historical records)
    │                                   │
    └──────────────┬────────────────────┘
                   │
           ┌───────┴────────┐
           │                │
           ▼                ▼
      OneDrive           ClickUp
      (Documents)        (Tasks)
           │
           ▼
    DOCX Templater → iLovePDF → Final PDF
```

---

## 📸 Screenshots

### Scenario 01 — Interest Form
![Scenario 01](docs/images/cenario01screenshot.png)

### Scenario 02 — Financial Proposal
![Scenario 02](docs/images/cenario02screenshot.png)

### Scenario 03 — Enrollment Form
![Scenario 03](docs/images/cenario03screenshot.png)

### Scenario 06 — Interview Assessment
![Scenario 06](docs/images/cenario06screenshot.png)

### Scenario 07 — Document Submission
![Scenario 07](docs/images/cenario07screenshot.png)

### Scenario 08 — RA Registration + Declaration
![Scenario 08](docs/images/cenario08screenshot.png)

### Scenario 10 — Payment Confirmed
![Scenario 10](docs/images/cenario10screenshot.png)

---

## 📋 Scenario Descriptions

### 01 — Interest Form
**Trigger:** Website webhook

Checks for duplicates in Kommo by phone number. If new candidate: creates contact and lead. If existing: creates new linked lead. Sends personalized email with UniMissional eBook.

**Highlights:** Automatic Brazilian phone formatting with 9th digit · Contact deduplication in Kommo · Google Sheets registration with Contact ID and Lead ID

---

### 02 — Financial Proposal
**Trigger:** Tally (internal team)

Generates personalized financial proposal PDF via DOCX Templater + iLovePDF. Creates ClickUp task with subtasks for tracking. Records in Excel and Google Sheets. Dual search (email + name) to prevent duplicate records when staff uses different emails for the same candidate.

**Highlights:** JavaScript converting monetary values to words in Portuguese · Set/Get Variable through Aggregators · Automatic CRM linkage

---

### 03 — Enrollment Form
**Trigger:** Tally (candidate)

Processes personal, family and emergency data. Sends automatic email to pastor with pre-filled pastoral form link. Generates PDF and sends to candidate for review. Distinguishes between first fill and re-submission.

**Highlights:** Routing by `Formulario_Row_ID` · ClickUp subtasks via single Feeder with name filter · Automatic email to pastor

---

### 04 — Personal Form
**Trigger:** Tally (candidate)

Records confidential candidate information in a spreadsheet restricted to coordination and mentor. Generates PDF and sends to candidate for review. Saves File ID in Google Sheets for later use in the Schedule Interview scenario.

**Highlights:** Separate restricted-access spreadsheet · File ID preserved for use in subsequent scenarios

---

### 05 — Pastoral Form
**Trigger:** Tally (pastor)

Processes the reference pastor's form. Records in restricted spreadsheet. Generates PDF and archives in OneDrive. Sends thank-you email to pastor using email synced from Google Sheets.

**Highlights:** Search by normalized CPF (numbers only) · Pastor thank-you email via synced field

---

### 06 — Schedule Interview
**Trigger:** Kommo webhook (custom field "Schedule Interview" = true)

JavaScript extracts nested custom field from Kommo array. Sends mentor the Enrollment Form and Personal Form PDFs by email for interview preparation. Includes pre-configured WhatsApp link and pre-filled assessment form link.

**Highlights:** JavaScript pattern for nested Kommo field extraction · Google Sheets search by `Kommo_Lead_ID`

---

### 07 — Interview Assessment
**Trigger:** Tally (mentor)

Conditional router by result: approved moves the lead in Kommo via API PATCH to the correct bucket, triggering the bot with next steps for the candidate; rejected posts urgent comment in ClickUp notifying the team. Generates PDF of the assessment and archives in OneDrive.

**Highlights:** Kommo API via `Make an API Call` with PATCH · Endpoint `/v4/leads` without `/api` prefix

---

### 08 — Document Submission
**Trigger:** Tally (candidate)

Receives up to 9 documents (ID, CPF, driver's license, marriage certificate, etc.). JavaScript builds a dynamic array filtering only valid URLs with `accessToken`. Iterator replaces 9 fixed parallel routes. Creates personalized OneDrive folder and organizes files by document type.

**Highlights:** Dynamic Iterator — 18 modules reduced to 4 · Multiple files per field handling · `accessToken` URL validation

---

### 09 — RA Registration + Covenant Declaration
**Trigger:** Kommo webhook (custom field "RA" filled)

JavaScript extracts the academic registration number (RA) from the lead by `field_id`. Records in Excel and Google Sheets. Simultaneously generates the Covenant Declaration PDF with the RA and candidate data, uploads to OneDrive and records the File ID. Updates ClickUp subtask.

**Highlights:** Excel date serial number eliminating regional format ambiguity · `round(parseNumber(timestamp) / 86400 + 25569; 0)` · 3 independent parallel routes

---

### 10 — Contract Generation
**Trigger:** ClickUp Watch Tasks Polling (subtask "Contract and Request" in progress)

Fetches all candidate data from Google Sheets directly by `ClickUp_Task_ID` — eliminating the Get Task and Text Parser regex modules that existed previously. Generates contract PDF via DOCX Templater + iLovePDF. Sends to finance team by email with contract and financial proposal attached.

**Highlights:** Unified JavaScript converting monetary value and discount percentage to words in Portuguese · Set/Get Variable preserving File ID between parallel routes

---

### 11 — Payment Confirmed
**Trigger:** ClickUp Watch Tasks Polling (payment subtask in progress)

When the finance team confirms payment of the first installment, updates Excel with "Enrolled" status, marks ClickUp subtask as complete, posts comment with date and performs tag swap for pipeline traceability.

**Highlights:** Search by `ClickUp_Task_ID` via `{{2.parent}}` · Tag swap for pipeline traceability

---

### 12 — Check-in
**Trigger:** Kommo webhook (check-in custom field = true)

When the student physically arrives at UniMissional and confirms via Kommo bot, records check-in in the students spreadsheet (separate from admissions), updates ClickUp subtask with comment and date, and performs tag swap.

**Highlights:** Aggregator with `status` field included eliminating unnecessary `getATask` module · Status filter directly in Feeder

---

### 13 — Candidate Withdrawal
**Trigger:** Kommo webhook (lead status change)

When the lead status in Kommo is moved to the withdrawal bucket, the scenario automatically records the withdrawal: posts a comment on the ClickUp task with the date, adds "withdrawn" tag, marks the task as complete, and updates Excel with "Withdrawn" status and observation with the date.

**Highlights:** Trigger via Kommo status · Automatic withdrawal date recording across all systems

---

## ⚙️ Architectural Optimizations

### Data Architecture

```
BEFORE:
Excel listWorksheetRows → N operations per execution

AFTER:
Google Sheets Search Rows → 1 operation per execution

Reduction: ~80% in Make.com operations
```

### Established Patterns

**1. Set/Get Variable through Aggregators**
```
Set Variable (before Iterator)
     │
Iterator → processes N bundles
     │
Get Variable (after Iterator — preserves value)
```

**2. JavaScript for nested Kommo fields**
```javascript
const fields = Array.isArray(input.fields) ? input.fields : [input.fields];
const field = fields.find(f =>
  f !== null && f !== undefined &&
  String(f.id) === String(input.field_id)
);
const value = field?.values?.[0]?.value ?? null;
```

**3. Excel date serial number**
```javascript
// Eliminates regional format ambiguity (DD/MM vs MM/DD)
round(parseNumber(formatDate(date; "X")) / 86400 + 25569; 0)
```

**4. Dynamic Iterator replacing fixed routes**
```
BEFORE: 9 fixed routes = 18 modules
AFTER:  JavaScript + Iterator = 4 modules
```

**5. fieldsById in Tally modules**
```
{{fieldsById.question_XXXXX}}  ✅  // Robust against renaming
{{fields.`Field Name`}}        ❌  // Breaks on rename
```

---

## 📁 Repository Structure

```
automacao-processoseletivo/
│
├── README.md                          # Portuguese version
├── README.en.md                       # This file (English)
│
├── docs/
│   ├── architecture.md
│   ├── optimizations.md
│   └── images/
│       ├── cenario01screenshot.png
│       ├── cenario02screenshot.png
│       ├── cenario03screenshot.png
│       ├── cenario06screenshot.png
│       ├── cenario07screenshot.png
│       ├── cenario08screenshot.png
│       └── cenario10screenshot.png
│
├── scripts/
│   ├── kommo-extract-custom-field.js
│   ├── number-to-words-ptbr.js
│   ├── dynamic-url-array.js
│   ├── excel-date-serial.js
│   └── tally-dropdown-update.js
│
├── schemas/
│   └── google-sheets-candidatos.md
│
└── blueprints/
    └── README.md
```

---

## 🔒 Security and Privacy

All blueprints in this repository have been sanitized — all sensitive data has been removed:

- ❌ Account and workbook IDs
- ❌ API tokens
- ❌ OneDrive folder and file IDs
- ❌ ClickUp list and task IDs
- ❌ Tally form IDs
- ❌ Candidate data

To use the blueprints, replace values marked with `YOUR_*` with your own credentials.

---

## 📄 License

This project is private and developed exclusively for UniMissional.
The code and architecture are shared for portfolio purposes.

---

<div align="center">

Developed by **[André Scultori](https://github.com/amscultori)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrescultori)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amscultori)

</div>
