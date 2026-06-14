# System Design & Architecture: Aether AI

This document details the architectural decisions, database models, directory configurations, and authentication pathways designed for **Aether AI**.

---

## High-Level Architecture Diagram

```mermaid
graph TD
    %% User Interactions
    Client[Next.js Client app] -->|HTTPS Requests| Router[Express Router]
    
    %% Router Layer
    subgraph Express Backend
        Router -->|/api/auth| AuthCtrl[Auth Controller]
        Router -->|/api/agents| ProtectMiddleware[Protect Middleware]
        Router -->|/api/users| AdminMiddleware[Admin Guard Middleware]
        
        %% Middleware Paths
        ProtectMiddleware -->|Verified JWT| AgentCtrl[Agent Controller]
        AdminMiddleware -->|Admin Role Only| UserCtrl[User Controller]
        
        %% Controller interactions with Database
        AuthCtrl --> Mongoose[Mongoose Models]
        AgentCtrl --> Mongoose
        UserCtrl --> Mongoose
    end
    
    %% Database layer
    subgraph Database Layer
        Mongoose --> MongoDB[(MongoDB Instance)]
    end
    
    %% Styling
    classDef client fill:#3b82f6,stroke:#1d4ed8,color:#fff;
    classDef backend fill:#8b5cf6,stroke:#6d28d9,color:#fff;
    classDef db fill:#10b981,stroke:#047857,color:#fff;
    class Client client;
    class Router,AuthCtrl,AgentCtrl,UserCtrl,ProtectMiddleware,AdminMiddleware,Mongoose backend;
    class MongoDB db;
```

---

## Folder Structure & Module Separation

We have partitioned the workspace into isolated `/backend` and `/frontend` directories to prevent namespace clashes and establish clean development separation.

### Backend Layout
```
/backend
├── config/             # Database connection setup
├── controllers/        # Request controllers containing core business logic
├── middleware/         # Auth verification and RBAC checks
├── models/             # Mongoose schemas for collections
├── routes/             # Path routing and endpoint binds
├── .env.example        # Env configuration template
└── server.js           # Server application bootstrap file
```
**Reasoning**: Decoupling the routing paths from database logic and controller behaviors ensures that endpoints can be modified or tested in isolation without risking database schema integrity.

### Frontend Layout
```
/frontend
├── app/                # Next.js App Router folders (TypeScript .tsx/.ts files)
│   ├── (marketing)/    # Route group for landing, services, and login views (with Nav/Footer)
│   ├── (dashboard)/    # Route group for protected admin/user workspace (with Sidebar layout)
│   └── globals.css     # Global styles and tailwind directives
├── components/         # Presentation elements
│   ├── ui/             # shadcn/ui components (Button, Input)
│   ├── Footer.tsx      # Core Footer component
│   └── Navbar.tsx      # Core Navbar component
├── lib/                # API client helper functions, state checks, and utility tools (utils.ts)
├── components.json     # shadcn/ui configuration settings
├── declarations.d.ts   # Wildcard css types declaration file
├── tsconfig.json       # TypeScript configuration settings
├── postcss.config.js   # CSS compiler setup
└── tailwind.config.js  # Styling spacing tokens and brand palettes
```
**Reasoning**: Next.js App Router groups (e.g. `(marketing)` and `(dashboard)`) allow us to apply different layouts (e.g. sidebar vs. navbar) automatically depending on routing path names.


---

## Data Models (MongoDB Schema)

### Users Collection
*   **Collection Name**: `users`
*   **Schema Definition**:
    *   `name`: String, required.
    *   `email`: String, required, lowercase, unique index.
    *   `password`: String, required, hashed via `bcryptjs` (excluded from default SELECT queries).
    *   `role`: String, enum: `['user', 'admin']`, default: `user`.
    *   `createdAt`: Date, default: `Date.now`.
*   **Indexes**: Unique index on `email`.

### Agents Collection
*   **Collection Name**: `agents`
*   **Schema Definition**:
    *   `name`: String, required.
    *   `type`: String, required, enum: `['support', 'research', 'workflow', 'custom']`.
    *   `status`: String, enum: `['active', 'idle', 'failed']`, default: `idle`.
    *   `owner`: ObjectId, ref: `User`, required.
    *   `config`: Sub-document object.
        *   `description`: String.
        *   `temperature`: Number (range 0.0 - 1.0), default: 0.7.
        *   `systemPrompt`: String.
    *   `createdAt`: Date, default: `Date.now`.
*   **Indexes**: Query index on `owner` for high-speed workspace loading.

---

## Authentication & Authorization Flow

1.  **JWT Signing**: When a user registers or logs in, the backend signs a JSON Web Token payload containing the user's Mongoose ID (`{ id: user._id }`) using a secure `JWT_SECRET`.
2.  **State Storage**: The client caches this token inside `localStorage` along with a subset of user credentials (`role`, `name`).
3.  **Client Headers**: Every subsequent client query to the backend sets `Authorization: Bearer <token>` in the fetch headers.
4.  **Route Protection (`protect`)**: Middleware interceptor extracts the token, decodes the user ID, verifies credentials against the DB, and sets `req.user` inside the execution scope.
5.  **Role Verification (`authorize('admin')`)**: A downstream middleware interceptor audits the user's role before letting request resolve.

---

## Request & Input Validation Layer

To ensure strict data validation and type safety across network layers, we use **Yup** validation schemas on both the frontend forms and the backend endpoints:

### 1. Backend Validation Schema Middleware (`validate.js`)
All write operations (POST/PUT) pass through a schema-validating middleware. This schema enforces structural rules and sanitizes inbound bodies before they hit database controllers:
*   **Registration Schema**: Enforces name length (min 2), unique formatted email, password length (min 6), and role matching.
*   **Login Schema**: Enforces presence of email and password credentials.
*   **Agent Configuration Schema**: Audits agent name (min 2), type enumerations, status classifications, and configuration object structures (description, temperature range 0.0 - 1.0, systemPrompt, agentApi).

### 2. Frontend Form Guarding
Forms (Login and Register) validate inputs client-side using mirror Yup schemas before initiating network requests. This ensures immediate UI errors and saves server bandwidth.

---

## API Surface

| Method | Endpoint | Authorized Roles | Function |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Register new user + return JWT token |
| **POST** | `/api/auth/login` | Public | Login credentials check + return JWT token |
| **GET** | `/api/auth/me` | User, Admin | Fetch profile metadata |
| **GET** | `/api/agents` | User (own), Admin (all) | Retrieve list of active agents (with optional search) |
| **POST** | `/api/agents` | User, Admin | Deploy a new agent |
| **PUT** | `/api/agents/:id` | Owner, Admin | Update agent configuration details |
| **DELETE** | `/api/agents/:id` | Owner, Admin | Terminate & delete agent configuration |
| **GET** | `/api/users` | Admin Only | Auditing - list all user profiles |
| **PUT** | `/api/users/:id` | Admin Only | Auditing - alter a user's system role |
| **DELETE** | `/api/users/:id` | Admin Only | Auditing - delete a user account |

---

## Architectural Trade-offs & Future Scopes

1.  **LocalStorage vs. HTTP-only cookies**:
    *   *Trade-off*: We chose standard header-based JWT tokens in `localStorage` for rapid cross-origin API integration.
    *   *Future improvement*: Transition to SameSite HTTP-only cookies to completely eliminate potential XSS vulnerabilities.
2.  **No Server-Side Session Synchronization**:
    *   *Trade-off*: JWT verifies sessions statelessly to scale efficiently.
    *   *Future improvement*: Implement a Redis token-revocation denylist to instantly terminate compromised user credentials in real-time.
