# Tech Spec – Careers Page Builder

## Overview

The system allows multiple companies to manage branded Careers pages while candidates browse company information and open roles. The platform is designed as a lightweight ATS-style prototype with clear separation between frontend, backend, and database.

---

## Architecture

Frontend (React + Vite) communicates with a REST API built using Node.js and Express. Data is stored in Supabase (PostgreSQL). Each company has its own configuration stored as JSON, allowing flexible page customization without schema changes.

High-level flow:

Browser → React Frontend → Express API → Supabase Database

---

## Monorepo Structure

/
├── Frontend   (React + Tailwind + React Router)
└── Backend    (Node.js + Express + Supabase client)

---

## Backend Design

### Server

* Express server exposes REST endpoints
* CORS enabled for frontend access
* JSON request/response format

### Supabase Client

* Supabase JS SDK used directly
* No ORM layer
* Environment variables used for credentials

### API Endpoints

GET /api/company

* Returns list of all companies

GET /api/company/:slug

* Returns single company metadata and config by slug

PUT /api/company/:slug/config

* Updates stored config JSON for a company

GET /api/company/:slug/jobs

* Returns jobs for a company
* Supports query params: location, type, search

---

## Database Schema

### companies table

Fields:

* id (uuid, primary key)
* slug (text, unique)
* name (text)
* config (jsonb)
* created_at (timestamp)

config JSON structure:

{
"theme": {
"primaryColor": "#hex",
"logoUrl": "string",
"bannerUrl": "string",
"cultureVideoUrl": "string"
},
"sections": [
{
"id": "uuid",
"title": "string",
"content": "string",
"enabled": true
}
]
}

### jobs table

Fields:

* id (uuid, primary key)
* company_slug (text)
* title (text)
* location (text)
* job_type (text)
* description (text)
* created_at (timestamp)

---

## Frontend Design

### Routing

/                      → Homepage (all companies)
/:slug/careers         → Public careers page
/:slug/edit            → Recruiter editor
/:slug/preview         → Preview mode

### State Handling

* Local React state used for config editing
* Fetch-based data loading
* No external state library

### UI Components

* Company cards on homepage
* Theme-based header on careers page
* Section renderer
* Job filters and listings
* Editor UI for theme and sections

---

## Data Isolation Per Company

Each company is uniquely identified by slug. All reads and writes use slug-based queries, ensuring that company configurations and job listings remain isolated in storage and API access.

---

## Editing and Preview Flow

* Editor loads stored config
* Changes applied in local state
* Preview route receives live config
* Save persists config to database
* Published careers page reads from stored config

---

## Filtering Logic

Jobs endpoint supports:

* location filter
* job_type filter
* title search (case-insensitive match)

Filtering executed at database query level via Supabase.

---

## Responsiveness

* Tailwind utility classes
* Mobile-first layout
* Flexible grids
* Accessible form inputs

---

## SEO Strategy

* Dynamic document title and description set on careers pages
* Crawlable HTML structure
* Semantic headings

---

## Scalability Considerations

If scaled to hundreds of companies:

* Slug-based indexing ensures fast queries
* JSONB config allows flexible schema evolution
* CDN-hosted frontend
* Stateless backend can be horizontally scaled

---

## Testing Plan

Manual functional testing:

* Load homepage and verify companies
* Navigate to careers pages
* Verify filters return correct jobs
* Edit company config and save
* Preview updates before publishing

Future automated tests:

* API integration tests
* UI component tests
* End-to-end navigation tests

---

## Assumptions

* Recruiter authentication is out of scope
* Image URLs are externally hosted
* Job application flow is intentionally excluded

---

## Future Enhancements

* Auth and role-based access
* File uploads for logos and banners
* Drag-and-drop editor
* Rich text sections
* Server-side rendering for stronger SEO
