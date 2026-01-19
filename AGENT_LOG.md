# AGENT_LOG

## Overview

This log captures how AI tools were used throughout the project to accelerate development, clarify design decisions, and refine implementation.

---

## Planning Phase

Used AI to:

* Break down the assignment requirements into backend and frontend tasks
* Clarify routing structure for recruiter and candidate flows
* Validate database schema design for storing company config as JSON

Key learning:
Storing page configuration in a JSONB column allowed flexible section management without frequent schema changes.

---

## Backend Development

Used AI to:

* Draft initial Express server setup
* Generate Supabase SQL schema
* Design REST API routes for company and job queries
* Debug Render deployment errors and fix start command issues

Key learning:
Monorepo deployments require explicit root directory configuration on hosting platforms.

---

## Frontend Development

Used AI to:

* Scaffold React pages and routing structure
* Build editor UI for theme and section management
* Implement careers page layout and filtering logic
* Refine Tailwind styling and responsive layouts
* Debug React export/import and build issues

Key learning:
Keeping preview state separate from persisted config simplified editor flow and reduced accidental overwrites.

---

## SEO and Deployment

Used AI to:

* Identify React 19 dependency conflicts
* Propose alternatives for meta tag handling
* Resolve Vercel and Render deployment issues

Key learning:
Peer-dependency conflicts are common in early React versions and can be bypassed or avoided with native browser APIs.

---

## Documentation

Used AI to:

* Structure README and Tech Spec documents
* Ensure required sections were covered
* Refine technical wording and clarity

Key learning:
Keeping documentation concise and direct improves readability for reviewers.

---

## Overall Reflection

AI was primarily used as a development assistant for ideation, code scaffolding, debugging, and refinement. Final implementation decisions and adjustments were made manually to fit project requirements and avoid overengineering.
