# Nharire Intelligence

**See Further. Know More. Decide Better.**

Nharire Intelligence is an African-first Data & AI Intelligence SaaS platform owned by **Nharire Data Group**. It helps businesses upload their data, understand it through validation and profiling, analyze it with real analytics, build dashboards, ask an AI Analyst questions grounded in verified results, and generate business reports.

---

## About Nharire Data Group

Nharire Data Group builds data and intelligence products for businesses. Nharire Intelligence is the first product in a planned ecosystem that may eventually include Nharire Data, Nharire Learn, Nharire Challenges, Nharire Academy, Nharire Labs, and Nharire Community. **Phase 1 focuses only on Nharire Intelligence.**

---

## Product Vision

Nharire Intelligence gives businesses a single place to turn raw operational data into clear insights and decisions. Instead of guessing from spreadsheets or relying on AI that might invent numbers, the platform runs **real analysis in Python first**, then uses AI only to explain verified results in plain language.

The long-term goal is to become the trusted intelligence layer for African businesses — practical, secure, and grounded in their own data.

---

## Phase 1 MVP

Phase 1 delivers the core journey from account creation to report generation. Features are built in ordered phases (A through N). **Phase A (current)** establishes the development environment and project foundation only.

### MVP user journey

1. Create account
2. Create organization
3. Create workspace
4. Upload dataset (CSV / Excel)
5. Validate dataset
6. Profile dataset
7. Analyze dataset
8. Generate dashboard
9. Ask Nharire AI
10. Generate insights
11. Generate report

---

## Approved Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS, Recharts |
| **Backend** | Python, FastAPI, Pandas |
| **Database** | PostgreSQL |
| **Authentication** | Firebase Authentication |
| **Storage** | Firebase Storage |
| **Analytics** | Pandas, NumPy |
| **AI** | LLM API connected to a verified Python analytics layer |
| **Version control** | Git, GitHub |
| **Deployment (planned)** | Vercel (frontend), Python-compatible cloud host (backend), managed PostgreSQL |

We intentionally avoid Docker, Kubernetes, microservices, Redis, and complex cloud infrastructure in Phase 1 unless absolutely necessary.

---

## Monorepo Structure

```text
nharire-intelligence/
├── frontend/          # Next.js web application (Phase B+)
├── backend/           # FastAPI API and analytics engine (Phase C+)
├── docs/              # Architecture and project documentation
├── .gitignore         # Files Git should ignore
├── .env.example       # Environment variable template (no secrets)
└── README.md          # This file
```

- **frontend/** — Everything the user sees in the browser.
- **backend/** — API server, business logic, data processing, and analytics.
- **docs/** — Design decisions and architecture reference for the team.

---

## Development Principles

1. **Multi-tenant security** — Every organization's data must be isolated. The backend validates organization membership on every protected request; never trust IDs sent from the browser alone.
2. **Verified analytics first** — Numbers shown to users and explained by AI must come from the Python analytics layer, not from the LLM inventing metrics.
3. **Simple before complex** — Build the smallest working version of each feature before adding advanced capabilities.
4. **Phased delivery** — Complete one phase, test it, then move to the next. Do not skip ahead.
5. **No secrets in Git** — Use `.env` files locally and environment variables in production. Copy from `.env.example`; never commit real keys.

---

## Local Development

> **Note:** The commands below belong to **later phases**. They are documented here for planning only. Phase A does not install dependencies or run application code.

### Prerequisites (later phases)

- Node.js 20+
- Python 3.11+
- PostgreSQL 15+ (local or managed dev instance)
- A Firebase project (auth and storage — added in later phases)

### Environment setup (later phases)

```bash
cp .env.example .env
```

Fill in placeholder values in `.env` with your local or development credentials. **Never commit `.env`.**

### Frontend — Phase B (not started)

```bash
cd frontend
npm install
npm run dev
```

Expected URL: `http://localhost:3000`

### Backend — Phase C (not started)

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Expected URL: `http://localhost:8000` (API docs at `/docs`)

### Running both together (later phases)

In day-to-day development you will run the frontend and backend in **two separate terminal windows** once those phases are implemented.

---

## License

Proprietary — Nharire Data Group. All rights reserved.
