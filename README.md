# Aether AI - Marketing Site & Workspace Dashboard

Welcome to the **Aether AI** production-ready codebase. This workspace houses a public-facing corporate website alongside an authenticated dashboard containing full CRUD capabilities for Users and AI Agents, backed by MongoDB.

---

## Live Deployments & Repository Details

*   **Vercel Live URL**: (https://aether-m3cnjyrnq-harish-ms-projects-cf2fbd35.vercel.app/)
*   **Git Repository**:(https://github.com/harishmarimuthu13022003/ai_agent_marketing_site.)

---

## Test Credentials

To test the role-based dashboard access, you can register new accounts using the registration screen (which includes a role selector for convenient testing), or utilize these pre-seeded demo accounts:

### Administrator Account
*   **Email**: `admin@aether.ai`
*   **Password**: `admin123`
*   **Role Permission**: Full user auditing logs + CRUD capability for all agent pools.

### Standard User Account
*   **Email**: `user@aether.ai`
*   **Password**: `user123`
*   **Role Permission**: Confined strictly to creating and editing their own configured agents.

---

## Environment Configuration

Copy the sample configurations and input your local or production credentials.

### Backend Configurations (`/backend/.env`)
Create a file at `/backend/.env` with:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/aether-ai
JWT_SECRET=aether_secret_key_123_abc_xyz
JWT_EXPIRE=30d
NODE_ENV=development
```

### Frontend Configurations (`/frontend/.env.local`)
Create a file at `/frontend/.env.local` with:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Local Setup & Launch Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance running locally (or MongoDB Atlas URI)

### 1. Launch Express Backend
```bash
cd backend
npm install
npm start
```
*The server will start listening at `http://localhost:5000`.*

### 2. Launch Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```
*Open your browser and navigate to `http://localhost:3000`.*

---

## Project Status

### What is Completed:
*   **Public Landing Pages**: Responsive landing page containing 7 sections (Hero, logo strip, features, testimonials, pricing plans, accordion FAQs, and footer).
*   **Corporate Sub-pages**: Detailed About Us story/mission and Services breakdown page.
*   **Role-Based Access Control**: Route protections, password hashing using `bcryptjs`, and stateless JWT authentication verifying permissions.
*   **Agents Workspace CRUD**: Searchable list, create and update settings, and delete modals calling backend endpoints.
*   **Admin Auditing Dashboard**: Fully operational table list, user role toggles, and safety safeguards (e.g. preventing self-deletion).
*   **CI/CD Pipeline**: GitHub Actions workflow verifying lock installations and compiling Next.js without syntax exceptions.

### What is Deferred / Future scope:
*   **Database Sync Retries**: Add exponential retry queues if connection strings drift.
*   **Interactive Agent Shell**: Inline terminal to let users trigger agent run simulations directly from the dashboard.

---

## How I Used AI

This application was engineered with the assistance of **Antigravity (built by Google DeepMind)** and **ChatGPT (OpenAI)** to speed up scaffolding, layout planning, database modeling, and styling decisions.

### 1. Tools & Responsibilities
*   **Antigravity (Google DeepMind)**: Handled complex code generation, full TypeScript conversion, `components.json` layout initializations, Yup schema validation middleware hooks (frontend/backend), and local Next.js verification compilation runs.
*   **ChatGPT (OpenAI)**: Used to draft landing page copy, design harmonized Tailwind CSS gradient cards, and debug initial Express route configuration structures.

### 2. Output Accepted As-Is
The prompt to generate the **User Mongoose Schema** (`backend/models/User.js`) pre-save password hashing hook was accepted from ChatGPT/Antigravity as-is:
```javascript
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { return next(); }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```
This cleanly automated database password hashing within the schema middleware layer without needing manual implementation.

### 3. AI Mistake & Human Correction
*   **The Issue**: The AI assistant tried to execute terminal setup scripts (`npm install`) directly on the host Windows system via PowerShell. The command failed because the Windows environment had a restrictive script execution policy preventing the execution of `npm.ps1` scripts.
*   **The Correction**: We bypassed the PowerShell policy restriction by invoking the Command Prompt shell directly via `cmd /c npm install ...` and `cmd /c npm run build`, which correctly loads the `.cmd` version of the npm executable instead of the blocked `.ps1` wrapper script.

