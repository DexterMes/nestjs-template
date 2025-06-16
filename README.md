<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
  </a>
</p>
<h1 align="center">NestJS Starter Template</h1>
<p align="center">
  A modern boilerplate for building scalable server-side applications using NestJS, Prisma, and PostgreSQL.
</p>

---

## Features

- 🔐 JWT Authentication (Login/Signup)
- 📘 Auto-generated Swagger API documentation
- 🧩 Prisma ORM with PostgreSQL integration
- 🌍 Global exception handling and validation
- 🎯 Pre-configured with `pnpm`, ESLint, and Prettier

---

## Tech Stack

| Layer                                                                                                                                                                             | Technology                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| <img src="https://nestjs.com/img/logo-small.svg" width="20" style="vertical-align: middle; padding:3px 6px 3px 0" /> **Framework**                                                | [NestJS](https://nestjs.com) – A progressive Node.js framework using TypeScript     |
| <img src="https://cdn.brandfetch.io/idBBE3_R9e/idI_xi9A1U.svg?c=1dxbfHSJFAPEGdCLU4o5B" width="20" style="vertical-align: middle; padding:3px 6px 3px 0" /> **ORM**                | [Prisma](https://www.prisma.io) – Modern ORM with type safety and migrations        |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="20" style="vertical-align: middle; padding:3px 6px 3px 0" /> **Database** | PostgreSQL – Reliable, open-source relational database                              |
| <img src="https://www.svgrepo.com/show/330754/jsonwebtokens.svg" width="20" style="vertical-align: middle; padding:3px 6px 3px 0" /> **Authentication**                           | JWT – Stateless auth using JSON Web Tokens                                          |
| <img src="https://www.svgrepo.com/show/306821/swagger.svg" width="20" style="vertical-align: middle; padding:3px 6px 3px 0" /> **API Docs**                                       | [Swagger](https://swagger.io) – Auto-generated API docs via `@nestjs/swagger`       |
| <img src="https://www.svgrepo.com/show/246336/tick-success.svg" width="20" style="vertical-align: middle; padding:3px 6px 3px 0" /> **Validation**                                | `class-validator` & `class-transformer` – Declarative validation and transformation |
| <img src="https://www.svgrepo.com/show/354208/prettier.svg" width="20" style="vertical-align: middle; padding:3px 6px 3px 0" /> **Code Style**                                    | ESLint + Prettier – Linting and code formatting standards                           |
| <img src="https://www.svgrepo.com/show/373984/pnpm.svg" width="20" style="vertical-align: middle; padding:3px 6px 3px 0" /> **Package Manager**                                   | [pnpm](https://pnpm.io) – Fast, efficient package management                        |

---

## Project Structure

```bash
src/
├── modules/                 # Feature modules (e.g., Auth)
├── prisma/                  # Prisma module and database service
├── middlewares/             # Global filters and exception handlers
├── errors/                  # Centralized error handling logic
├── utils/                   # Shared utility functions (JWT, logging, etc.)
├── main.ts                  # Application entry point
├── app.module.ts            # Root application module
└── env.validation.ts        # Environment variable validation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher)
- Package manager: `pnpm`, `yarn`, or `npm`
- A running PostgreSQL database instance

---

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/dextermes/nestjs-template.git
cd nestjs-template
```

2. **Install dependencies**

```bash
# Use your preferred package manager
pnpm install
# or
yarn install
# or
npm install
```

3. **Set up environment variables**

```bash
cp .env.sample .env
```

Update the .env file with your database connection string and JWT secret:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

### 🛠️ Prisma Setup

1. **Generate Prisma Client**

```bash
npx prisma generate
```

✅ No migration needed — it's already included in the repo.

2. **Running the App**

Start the development server:

```bash
pnpm start:dev
# or
npm run start:dev
```

3. **API Documentation**

Once the app is running, open http://localhost:3000/api to access Swagger UI.
