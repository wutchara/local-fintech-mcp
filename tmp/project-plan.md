# Project 1: The Local Fintech MCP Server — Review & Plan

## 📌 Purpose

Build a **local backend service** that exposes a **mock financial database** to an AI agent via the **Model Context Protocol (MCP)**. The AI agent should be able to:

1. Query a user's transaction history
2. Flag potential spending anomalies (transactions exceeding a given threshold)

This is a **practice project** designed to exercise agentic AI + backend engineering skills.

---

## 📋 Requirements Summary

| # | Requirement | Details |
|---|-------------|---------|
| 1 | **MCP Server** | Implement a server that follows the Model Context Protocol specification |
| 2 | **Tool: `get_user_transactions(userId)`** | Returns a JSON array of recent mock transactions for a given user |
| 3 | **Tool: `flag_anomalies(userId, threshold)`** | Returns transactions for a user that exceed the provided threshold amount |
| 4 | **Database** | PostgreSQL running locally via Docker |
| 5 | **Schema** | `transactions` table with columns: `id`, `user_id`, `amount`, `merchant`, `timestamp` |
| 6 | **Seed Data** | 20 mock financial transaction records |
| 7 | **Infrastructure** | `docker-compose.yml` to spin up PostgreSQL |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Language** | TypeScript |
| **Runtime** | Node.js |
| **Database** | PostgreSQL |
| **Containerization** | Docker / Docker Compose |
| **Protocol** | Model Context Protocol (MCP) — using the official SDK |

---

## 🏗 Deliverables (Step-by-Step Build Order)

1. **`docker-compose.yml`** — PostgreSQL container setup
2. **DB Init Script** — Schema creation (`transactions` table) + seed 20 mock records
3. **MCP Server** — Scaffold using the official MCP SDK, connect to PostgreSQL
4. **MCP Tools Implementation** — `get_user_transactions` and `flag_anomalies`

---

## 🔍 Key Observations & Considerations

### Architecture
- This is a **local-only** service (no cloud deployment required)
- The MCP server acts as a **bridge** between the AI agent and the database
- Only **2 tools** are required — keep it focused and minimal

### Things to Decide Before Implementation
- **Node.js framework**: Plain Node.js vs NestJS (README suggests plain Node.js/TypeScript)
- **MCP SDK version**: Which version of `@modelcontextprotocol/sdk` to use
- **Database client**: `pg` (node-postgres) vs Prisma vs Drizzle
- **TypeScript tooling**: `tsx` for dev, `tsc` for build
- **Port configuration**: PostgreSQL port (default 5432), MCP server transport (stdio vs SSE)

### Suggested Project Structure
```
.
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts          # MCP server entry point
│   ├── db.ts             # Database connection
│   └── tools/
│       ├── get-user-transactions.ts
│       └── flag-anomalies.ts
└── scripts/
    └── seed.sql           # Schema + seed data
```

---

## ✅ Next Steps

- [ ] Review and confirm tech choices (DB client, MCP transport, etc.)
- [ ] Set up Docker Compose for PostgreSQL
- [ ] Create DB schema and seed script
- [ ] Scaffold MCP server with official SDK
- [ ] Implement `get_user_transactions` tool
- [ ] Implement `flag_anomalies` tool
- [ ] Test end-to-end with an MCP client / AI agent
