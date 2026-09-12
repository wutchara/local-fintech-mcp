# Project 1: The Local Fintech MCP Server
The Scenario
You need to build a local backend service that exposes a mock financial database to an AI agent. The agent must be able to securely query this server to retrieve a user's transaction history and flag potential anomalies (e.g., unusually high spending).

## The Requirements

- Core Stack: TypeScript with Node.js (or NestJS/Go if you prefer to prompt for that) and PostgreSQL.

- Infrastructure: The database must be spun up locally using Docker.

- The Interface: The service must implement the Model Context Protocol (MCP).

- The Tools: Expose exactly two MCP tools to the agent:
  - `get_user_transactions(userId)`: Returns a JSON array of recent mock transactions.
  - `flag_anomalies(userId, threshold)`: Returns transactions for a user that exceed the provided threshold amount.

### Your Agentic Practice Step
Your task is to craft the overarching instructions for your local AI agent to scaffold this entire setup. You want the agent to generate the docker-compose.yml, the database schema, the mock data seed script, and the MCP server code.

### Starter Prompt (Feed this to your local AI tool):
```
Act as a senior backend engineer. I need to build a local Model Context Protocol (MCP) server in TypeScript/Node.js that interacts with a PostgreSQL database. 

Please perform the following steps sequentially:
1. Create a docker-compose.yml for a PostgreSQL database.
2. Write a script to initialize a 'transactions' table (id, user_id, amount, merchant, timestamp) and seed it with 20 mock financial records.
3. Scaffold an MCP server using the official SDK that connects to this database.
4. Implement two MCP tools: 'get_user_transactions' and 'flag_anomalies'. 

Ask me to review the Docker setup before proceeding to the Node.js implementation.
```

---

## 🚀 How to Run and Test

### 1. Prerequisites
- **Docker**: Must be installed and running (e.g., Docker Desktop).
- **Node.js**: Ensure Node is installed (v18+ recommended).

### 2. Setup & Build
Install dependencies and build the TypeScript code:
```bash
npm install
npm run build
```

### 3. Start the Database
Spin up the local PostgreSQL database using Docker. This will automatically run the seed script to populate mock transactions.
```bash
docker-compose up -d
```

### 4. Test via MCP Inspector (Recommended)
You can use the official MCP Inspector to test the server directly from your browser:
```bash
npx @modelcontextprotocol/inspector node dist/index.js
```
Open the provided URL (typically `http://localhost:5173`) in your browser to interactively test the `get_user_transactions` and `flag_anomalies` tools.

### 5. Install as a Plugin in Claude Desktop
To use this server as a true AI plugin, you can connect it to an MCP-compatible client like the **Claude Desktop app**.

**Step 1: Open Claude's configuration file**
Open your terminal and run this command (for Mac):
```bash
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Step 2: Add your server**
Paste the following JSON, ensuring it points to the absolute path of your `dist/index.js` file:
```json
{
  "mcpServers": {
    "local-fintech-db": {
      "command": "node",
      "args": [
        "/Users/wutchararachadach/Documents/HAM/ai-agent-local/problem-practices/The Local Fintech MCP Server/dist/index.js"
      ]
    }
  }
}
```

**Step 3: Restart and Chat!**
1. Completely quit Claude Desktop (`Cmd + Q`) and reopen it.
2. Look for the **plug/hammer icon** 🔌 in the Claude interface, indicating the plugin loaded successfully.
3. Try asking it natural questions like:
   - *"Can you get the transaction history for user456 from my fintech database?"*
   - *"Are there any anomalies for user123 over a threshold of $50?"*
