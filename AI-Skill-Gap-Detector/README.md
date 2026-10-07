# AI Skill Gap Detector

An AI-driven platform that evaluates technical, reasoning, and aptitude competencies against target job roles, detects skill gaps, and generates customized learning roadmaps and interview preparation modules.

## Architecture

- **Frontend (`/frontend`)**: React application powered by Vite, featuring role assessment modules, interactive coding editor, skill gap analytics, and AI interview simulator.
- **Backend (`/backend`)**: Node.js & Express RESTful API handling authentication, job profiles, questions, assessment scoring, and roadmap services.
- **AI Service (`/ai-service`)**: Python microservice running LLM evaluation pipelines for answers, interview simulations, and weekly reports.
- **Database (`/database`)**: Seed schemas and dataset definitions for questions, jobs, skills, and resources.

## Quick Start

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Run Applications
```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && npm install && npm run dev
```
