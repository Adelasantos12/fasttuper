# Architectural Decisions

This document records the architectural decisions for the project.

## 1. Technology Stack
- **Backend Framework**: NestJS (TypeScript)
- **Frontend Framework**: Next.js (App Router, TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma (Approved)
- **Monorepo Tool**: Turborepo (Compatible with future migration to Nx)
- **Package Manager**: npm

## 2. Authentication
- **MVP**: Email/Password + JWT + Refresh Tokens.
- **Future**: Google OAuth (Sprint 2/3).
- **Email Verification**: Required for payments/subscriptions/consultations.
  - Implementation: OTP or Link.
  - Validation: Block critical actions if not verified.

## 3. Operational Rules
- **Timezone**: All logic (cut-offs, billing cycles) must operate in **Mexico City Time (CDMX)**.
- **Weekly Cycle**:
  - Starts Monday 00:00.
  - Cut-off for changes/subscriptions: Wednesday 23:59 (for the *following* week).
  - Late subscriptions start the week after next.
- **Cluster Discount**:
  - Evaluated Wednesday 23:59.
  - Applies to the *upcoming* billing cycle (next Monday).
  - No retroactive rebates.
  - Progress bar visible to users.

## 4. Container Management
- **Deposit**: One-time fee held while subscription is active.
- **Refund Policy**: Configurable.
- **Loss/Breakage**: Charge a separate replacement fee (MVP). Deposit remains intact.
- **Tracking**: QR Code on every container (Ledger system).

## 5. Marketplace & Logistics
- **Delivery Fee**:
  - Free if bundled with a meal subscription delivery (same cluster/window).
  - Flat fee (configurable by zone) if standalone order.
  - Block orders outside supported zones.
- **"Trae 3 más"**: Cluster discount logic based on active subscribers in a location.

## 6. UI/UX
- **Library**: Tailwind CSS + shadcn/ui.
- **Design System**: Premium, accessible, mobile-first for drivers.

## 7. Data Management
- **Seeding**:
  - Ingredients & Marketplace Products: CSV Import tool.
  - Recipes & Menu Templates: Manual entry via Nutritionist/Chef panels.
