# Production deployment checklist

## Required environment values

Copy `backend/.env.example` and `frontend/.env.example` to local `.env` files. Do not commit the real files. Set a long, random `JWT_SECRET`, a production MongoDB connection string, and the exact deployed frontend URL in `CLIENT_URL`.

## Services

- Deploy the React frontend as a static Vite build.
- Deploy the Express backend with `NODE_ENV=production`.
- Deploy the FastAPI service separately when AI analysis is enabled.
- Use a managed MongoDB database with backups and IP/network restrictions.

## Security notes

- The backend now sends secure HTTP headers, restricts CORS to `CLIENT_URL`, limits request size, and rate-limits API and login endpoints.
- Assessment and progress endpoints require a bearer token and scope records to the signed-in user.
- The browser-based code runner is suitable for learning feedback only. For official assessment scoring, replace it with an isolated server-side runner (for example, a short-lived container with no network, strict CPU/memory limits, and a separate job queue).
- Password-reset and verification links require an SMTP or transactional-email provider. Add provider credentials and a verified sending domain before enabling delivery; never expose these credentials to the frontend.
- The question manager is available at `/admin/questions` and is enforced by the backend for MongoDB users whose `role` is `admin`.

## Monitoring

`GET /api/health` is suitable for uptime checks. `GET /api/metrics` reports basic runtime metrics; set `METRICS_TOKEN` and send it as a bearer token before exposing it outside a private network.

## Release checks

Run `npm run check --prefix backend`, `npm test --prefix backend`, `npm run build --prefix frontend`, and `python -m py_compile ai-service/main.py ai-service/skill_gap.py` before deployment.
