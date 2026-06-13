# Findly Admin UI

Production-style mock admin dashboard for the Findly AI Lost & Found platform.

## Features

- Admin login/logout mock flow
- Protected dashboard layout
- Dashboard metrics and activity
- Users management
- Reports moderation
- Claims moderation
- AI matches review
- Notifications monitor
- Audit logs
- Platform settings
- Responsive sidebar and mobile navigation
- Mock store ready to replace with real APIs

## Run

```bash
npm install
npm run dev
```

Default dev port: `5174`.

## Demo login

Use any email/password in the login form. The app uses mock authentication until backend APIs are connected.

## Backend integration

Replace the handlers in `src/app/AdminStore.tsx` with API calls to your Spring Boot backend.
# Lost-And-Found-Admin-web
