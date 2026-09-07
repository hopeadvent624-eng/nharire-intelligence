# Nharire Intelligence — High-Level Architecture

This document describes the approved architecture for Nharire Intelligence Phase 1. It is a reference for how the system is intended to work as we build each phase.

---

## Product Overview

Nharire Intelligence is a multi-tenant SaaS platform. Users belong to **organizations**, work inside **workspaces**, and manage **datasets**, **dashboards**, **analyses**, **insights**, **reports**, and **AI conversations** within those workspaces.

```text
User
└── Organization
    ├── Members
    └── Workspaces
        ├── Datasets
        ├── Dashboards
        ├── Analyses
        ├── Insights
        └── Reports
```

**Tenant isolation rule:** A user's organization must never access another organization's data. Use `organization_id` consistently for tenant boundaries and `workspace_id` where resources belong to a specific workspace.

---

## System Layers

```text
┌─────────────────────────────────────────────────────────────┐
│  Browser (User)                                             │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Frontend — Next.js + React + TypeScript + Tailwind         │
│  Charts: Recharts                                           │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS / REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  Backend — Python + FastAPI                                 │
│  Analytics — Pandas + NumPy                                 │
│  Auth verification — Firebase Admin SDK                       │
└───────┬─────────────────┬─────────────────┬─────────────────┘
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐
│ PostgreSQL   │  │ Firebase     │  │ LLM API              │
│ (app data)   │  │ Auth +       │  │ (natural language    │
│              │  │ Storage      │  │  over verified       │
│              │  │ (files)      │  │  analytics results)  │
└──────────────┘  └──────────────┘  └──────────────────────┘
```

---

## Technology Choices

| Concern | Technology | Role |
|---------|------------|------|
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS | Web UI, routing, components |
| **Charts** | Recharts | Dashboard visualizations |
| **Backend** | Python, FastAPI | REST API, validation, orchestration |
| **Database** | PostgreSQL | Users, orgs, workspaces, metadata, configs |
| **Authentication** | Firebase Authentication | Identity (sign up, login, tokens) |
| **Storage** | Firebase Storage | Uploaded CSV and Excel files |
| **Analytics** | Pandas, NumPy | KPIs, trends, comparisons, profiling |
| **AI** | LLM API + Python analytics | LLM explains verified results only |
| **Deployment** | Vercel + Python-compatible host + managed PostgreSQL | Production hosting |

Firebase handles **who you are**. PostgreSQL handles **what you own and how it relates**. The backend sits in the middle and enforces all access rules.

---

## Security and Tenant Isolation

Every protected request should follow this chain:

```text
Authenticated User
  → Organization Membership verified
  → Workspace Access verified
  → Resource Access verified
```

Principles:

- Firebase Authentication provides identity tokens.
- The backend verifies tokens with Firebase Admin SDK.
- The backend loads the application user and checks membership in PostgreSQL.
- **Never trust** `organization_id`, `workspace_id`, or `user_id` from the frontend without validating ownership on the backend.
- Do not create a second competing authentication system.

---

## Planned Analytics and AI Flow

The AI must **not invent numbers**. The approved pipeline:

```text
User Question
  → Understand Question
  → Identify Dataset
  → Identify Relevant Columns
  → Run Real Analysis (Python / Pandas / NumPy)
  → Validate Result
  → Send Verified Results to LLM
  → Generate Natural-Language Explanation
```

The LLM interprets structured, verified analytical output. All metrics, counts, and percentages must be computed in Python before the LLM sees them.

---

## Planned Major Database Entities

These tables will be implemented in the Database phase (Phase D):

| Entity | Purpose |
|--------|---------|
| `users` | Application user linked to Firebase UID |
| `organizations` | Tenant boundary |
| `organization_members` | User ↔ organization membership and roles |
| `workspaces` | Project areas within an organization |
| `datasets` | Dataset metadata per workspace |
| `dataset_files` | File references in Firebase Storage |
| `dataset_columns` | Column names, types, profile stats |
| `dashboards` | Dashboard definitions |
| `dashboard_widgets` | Widget config (KPI, charts, tables) |
| `analyses` | Stored analysis runs and results |
| `insights` | Generated insight records |
| `reports` | Report metadata and artifacts |
| `ai_conversations` | AI chat sessions |
| `ai_messages` | Messages within a conversation |
| `subscriptions` | Plan and billing state |
| `usage_records` | Metered usage (uploads, AI calls, storage) |

---

## Planned API Boundaries

These endpoints are architectural targets. Not all will exist until their respective phases:

| Method | Endpoint | Phase |
|--------|----------|-------|
| POST | `/api/organizations` | Later |
| GET | `/api/organizations` | Later |
| POST | `/api/workspaces` | Later |
| GET | `/api/workspaces` | Later |
| POST | `/api/datasets/upload` | Phase F |
| GET | `/api/datasets` | Phase F |
| GET | `/api/datasets/{id}` | Phase F |
| DELETE | `/api/datasets/{id}` | Phase F |
| POST | `/api/analysis` | Phase H |
| GET | `/api/analysis/{id}` | Phase H |
| POST | `/api/dashboards` | Phase I |
| GET | `/api/dashboards` | Phase I |
| PUT | `/api/dashboards/{id}` | Phase I |
| POST | `/api/ai/chat` | Phase J |
| POST | `/api/reports` | Phase K |
| GET | `/api/reports` | Phase K |
| GET | `/api/usage` | Phase L |
| GET | `/api/subscription` | Phase L |

---

## Dashboard Widgets (Planned)

Phase I will support widgets such as:

- KPI card
- Line chart
- Bar chart
- Area chart
- Pie / donut chart
- Data table
- AI insight card

Dashboards will support filters and interactive exploration.

---

## Deployment Architecture (Planned)

| Component | Target |
|-----------|--------|
| Frontend | Vercel |
| Backend | Python-compatible cloud host (e.g. Railway, Render, Fly.io) |
| Database | Managed PostgreSQL (e.g. Neon, Supabase) |
| Auth & file storage | Firebase (separate dev and prod projects) |
| CI | GitHub Actions |

Phase 1 MVP does not require Docker, Kubernetes, or Redis.

---

## Phase A Scope (Current)

Phase A includes only:

- Monorepo folder structure (`frontend/`, `backend/`, `docs/`)
- Root documentation and architecture reference
- `.gitignore` and `.env.example`
- Git repository initialization

No application code, dependencies, authentication, database, or feature endpoints are part of Phase A.
