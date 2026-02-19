# Premium B2B2C Food Platform

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (for database and redis)

### Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start Infrastructure**
   ```bash
   docker-compose up -d
   ```

3. **Setup Database**
   ```bash
   npx turbo run db:generate
   npx turbo run db:push
   cd packages/database && npx prisma db seed
   ```

4. **Run Development Server**
   ```bash
   npx turbo run dev
   ```

### Architecture

See [DECISIONS.md](./DECISIONS.md) for architectural choices and operational rules.

- **Apps**
  - `apps/backend`: NestJS API
  - `apps/frontend`: Next.js App Router

- **Packages**
  - `packages/database`: Prisma Schema and Client
  - `packages/types`: Shared TypeScript interfaces
