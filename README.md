# DSC Event Portfolio Platform — Blueprints 2027

An editorial-quality, production-ready event portfolio, dynamic registration engine, attendance tracking system, verifiable PDF certificate issuance pipeline, and transactional notification platform built for the **Developer Student Community (DSC)** at **Sri Venkateswara College of Engineering (SVCE)**.

---

## Key Highlights

- **Flagship Blueprints’27 Showcase:** Complete editorial presentation with registration workflows, problem statement tracks, and capacity controls.
- **Dynamic Event Engine:** Event-specific registration forms, server-side authoritative validation, duplicate prevention, and cryptographic non-guessable registration IDs (`BP27-XXXX-XXXX`).
- **Contactless QR Attendance Check-in:** Rapid volunteer check-in terminal with database-level duplicate prevention and audit logging.
- **Automated PDF Certificate Pipeline:** Generates authentic landscape A4 certificates in pure TypeScript using `pdf-lib` with embedded QR codes pointing to public verification routes.
- **Durable Brevo Email Outbox:** Dual-adapter email transport (Brevo SMTP `smtp-relay.brevo.com:587` + HTTPS REST API fallback) with exponential backoff and idempotency.
- **Problem Statements Mission Database:** Admin-managed drafts, published mission briefings, ordering, and database-backed PDF/DOC/DOCX attachments.
- **Access-Controlled Admin Operations Portal:** Role-based access, password hashing via `scrypt`, sanitized CSV exports with formula injection protection, and email queue management.

---

## Architecture & Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19, TypeScript (Strict) |
| **Styling** | Tailwind CSS + Monochrome Editorial Theme |
| **Database** | libSQL / SQLite (D1 / Turso compatible) with SQL Migrations |
| **PDF Generation** | `pdf-lib` (pure TypeScript/JS, no Chromium needed) |
| **QR Code Engine** | `qrcode` (PNG buffer & SVG generation) |
| **Email Service** | Brevo Transactional SMTP Relay (`smtp-relay.brevo.com:587`) |
| **Scheduler** | Cloudflare Workers (5-minute Cron Trigger) |
| **Testing** | Vitest (Unit & Integration Test Suite) |

---

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js >= 18.x (tested on Node 24)
- npm >= 9.x

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/VanarpSuriv/dsc-event-platform.git
cd dsc-event-platform

# Install dependencies
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Brevo SMTP key in `.env` (the system defaults to mock transport if keys are omitted).

### 4. Database Setup & Seeding
```bash
# Run relational SQL schema migrations
npm run db:migrate

# Seed events (Blueprints'27, HackCraft, etc.)
npm run db:seed
```

### 5. First-Run Administrator Bootstrap
The platform enforces a secure, non-reusable first-run bootstrap process (no default or hardcoded credentials exist):

```bash
# Option A: Command-line bootstrap
npm run admin:bootstrap -- --email admin@dsc-svce.in --name "DSC Lead" --password "YourStrongPassword123!"

# Option B: Web UI bootstrap
# Navigate to http://localhost:3000/admin and complete the first-run initialization form.
```
*Note: Once an administrator account exists, the bootstrap endpoint permanently locks (returning 403 Forbidden).*

### 6. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Public Event Portfolio:** `http://localhost:3000/`
- **Blueprints’27 Details & Registration:** `http://localhost:3000/events/blueprints-27`
- **Problem Statements:** `http://localhost:3000/problem-statements`
- **Registration Lookup:** `http://localhost:3000/lookup`
- **Public Certificate Verification:** `http://localhost:3000/verify/CERT-BP27-DEMO-9999`
- **Admin Operations Dashboard:** `http://localhost:3000/admin` (Log in with your bootstrapped credentials)

Problem statement management is available in the Admin dashboard to administrator and superadministrator accounts. Apply database migrations with `npm run db:migrate`; no problem statement samples are seeded.

## Automated Verification & Testing

Run all unit and integration tests:
```bash
npm run test
```

Run TypeScript strict type checking:
```bash
npm run type-check
```

Build production bundle:
```bash
npm run build
```

Process pending outbox email queue manually:
```bash
npm run email:process
```

---

## Detailed Documentation

- **Architecture & ER Diagram:** [docs/architecture.md](docs/architecture.md)
- **Architecture Decision Records (ADR):** [docs/ADR.md](docs/ADR.md)
- **Security & Threat Mitigation:** [docs/security.md](docs/security.md)
- **Deployment Guide:** [docs/deployment.md](docs/deployment.md)
- **Brevo Email Outbox Operations:** [docs/email.md](docs/email.md)
- **Cloudflare Cron Scheduler:** [cron-worker/README.md](cron-worker/README.md)
- **Testing Record & Verification Suite:** [docs/testing.md](docs/testing.md)

---

## License

Created for the Developer Student Community at Sri Venkateswara College of Engineering (SVCE). Open-source under the MIT License.
