# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Backend API configuration

The chat features expect an API endpoint that accepts a JSON payload
`{ "question": "..." }` and returns `{ "answer": "..." }`. Configure the
endpoint URL via the `KGPT_BACKEND_URL` environment variable. If unset,
the app defaults to `https://kgpt-1.onrender.com/query`.
