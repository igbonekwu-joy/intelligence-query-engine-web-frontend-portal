# Insighta Labs+ Web Portal

A secure web interface for the Insighta Labs Profile Intelligence System. Built for non-technical users — analysts, stakeholders, and internal teams — to browse, search, and manage profile data through a clean, authenticated UI.


---

## Features

- **GitHub OAuth login** — one-click authentication, no passwords
- **Dashboard** — at-a-glance metrics on profile data
- **Profiles list** — filter, sort, and paginate through profiles
- **Profile detail view** — full breakdown of a single profile
- **Natural language search** — query profiles in plain English
- **Account page** — view your role and session info
- **Role-based UI** — admin actions (create/delete) are hidden from analysts
- **CSRF protection** — all mutating requests include a CSRF token
- **HTTP-only cookies** — tokens are never exposed to JavaScript

---

## Pages

| Route | Description | Auth Required |
|---|---|---|
| `/login` | GitHub OAuth entry point | No |
| `/dashboard` | Summary metrics | Yes |
| `/profiles` | List with filters + pagination | Yes |
| `/profiles/:id` | Single profile detail | Yes |
| `/search` | Natural language search | Yes |
| `/account` | Current user info + role | Yes |

---

## Authentication Flow

1. User clicks **Continue with GitHub** on the login page
2. Browser is redirected to GitHub OAuth
3. GitHub redirects back to the backend callback (`/auth/github/callback`)
4. Backend exchanges the code, creates or retrieves the user, and issues tokens
5. Tokens are stored in **HTTP-only cookies** — inaccessible to JavaScript
6. All subsequent requests are authenticated via cookie session

To log out, the session is invalidated server-side and cookies are cleared.

---

## Role Enforcement

| Action | Analyst | Admin |
|---|---|---|
| View profiles | ✅ | ✅ |
| Search profiles | ✅ | ✅ |
| Export CSV | ✅ | ✅ |
| Create profile | ❌ | ✅ |
| Delete profile | ❌ | ✅ |

Role is assigned on first login (default: `analyst`). Admins are promoted directly in the database.

---

## CSRF Protection

All `POST`, `PUT`, `PATCH`, and `DELETE` requests from the portal include an `X-CSRF-Token` header. The token is:

- Generated server-side and attached to the session
- Delivered to the frontend via a non-HTTP-only cookie (`csrf_token`)
- Read by JavaScript and sent as a request header on every mutating call
- Validated against the session token on the backend before processing

---

## Tech Stack

- **Framework:** [your framework, e.g. React / Next.js / Vue]
- **HTTP client:** Axios (with request interceptors for CSRF + API versioning)
- **Auth:** GitHub OAuth via backend session cookies
- **Styling:** [e.g. Tailwind CSS]

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the [Insighta Labs+ Backend](https://github.com/your-org/insighta-backend)

### Setup

````bash
git clone https://github.com/igbonekwu-joy/intelligence-query-engine-web-frontend-portal
cd intelligence-query-engine-web-frontend-portal
npm install
````

Create a `.env` file:

````env
REACT_APP_API_URL=https://your-backend-url.com
````

Start the dev server:

````bash
npm start
````

---

## Environment Variables

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Base URL of the backend API |

---

## Contributing

Branch naming: `feat/`, `fix/`, `chore/`

````
feat(auth): add github oauth redirect
fix(profiles): handle empty search results
````

---

## Related Repositories

- 🔧 [Backend](https://github.com/igbonekwu-joy/intelligence-query-engine)
- 💻 [CLI](https://github.com/igbonekwu-joy/intelligence-query-engine-web-frontend-portal)