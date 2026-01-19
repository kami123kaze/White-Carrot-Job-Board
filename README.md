# White Carrot – Careers Page Builder

This project is a small ATS-style product that allows companies to create branded Careers pages and allows candidates to browse open roles.

The repository is structured as a monorepo containing both frontend and backend applications.

---

## Project Structure

Frontend – React + Vite + Tailwind
Backend – Node.js + Express + Supabase (PostgreSQL)

/
├── Frontend
└── Backend

---

## Features

### Recruiter

* Edit company branding (colors, logo, banner)
* Manage content sections (add, remove, reorder, enable/disable)
* Preview careers page before publishing
* Save configuration per company

### Candidate

* Browse companies from homepage
* View company-specific careers pages
* Read company content sections
* Browse open jobs
* Filter jobs by location, type, and title search

---

## Tech Stack

Frontend:

* React (Vite)
* Tailwind CSS
* React Router

Backend:

* Node.js
* Express
* Supabase (PostgreSQL)
* REST APIs

Deployment:

* Frontend: Vercel
* Backend: Render
* Database: Supabase

---

## Running Locally

### 1. Clone repository

git clone [https://github.com/kami123kaze/White-Carrot-Job-Board](https://github.com/kami123kaze/White-Carrot-Job-Board)
cd White-Carrot-Job-Board

---

### 2. Backend Setup

cd Backend
npm install

Create `.env` in Backend root:

SUPABASE_URL=    your_supabase_project_url:

SUPABASE_ANON_KEY=your_supabase_anon_key:

Start backend:
node src/index.js

Backend runs at:

[http://localhost:4000](http://localhost:4000)

---

### 3. Frontend Setup

cd ../Frontend
npm install
npm run dev

Frontend runs at:

[http://localhost:5173](http://localhost:5173)
{deployment version hits the render API so if cloning on local machine change API_BASE:- to localhost

---

## Database Schema

### companies

* slug (unique)
* name
* config (JSONB)

  * theme (primaryColor, logoUrl, bannerUrl, cultureVideoUrl)
  * sections (array of content blocks)

### jobs

* company_slug
* title
* location
* job_type
* description

---

## Usage Guide

1. Visit homepage to see all companies

2. Click a company to view its careers page

3. Browse and filter open roles

4. Recruiters can edit a company at:
   /:company-slug/edit

5. Preview changes:
   /:company-slug/preview

---

## Improvement Ideas

* Authentication for recruiters
* Rich text editor for sections
* Drag-and-drop section reordering
* Dedicated job detail pages
* Image upload to Supabase storage
* Server-side rendering for stronger SEO

---

## Notes

This project is built as a functional prototype focusing on usability, clean architecture, and scalabilty
