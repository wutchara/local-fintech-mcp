import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { getUserTransactions } from "./tools/get-user-transactions.js";
import { flagAnomalies } from "./tools/flag-anomalies.js";

const server = new Server(
  {
    name: "local-fintech-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_user_transactions",
        description: "Returns a JSON array of recent mock transactions for a given user.",
        inputSchema: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "The ID of the user to get transactions for",
            },
          },
          required: ["userId"],
        },
      },
      {
        name: "flag_anomalies",
        description: "Returns transactions for a user that exceed the provided threshold amount.",
        inputSchema: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              description: "The ID of the user",
            },
            threshold: {
              type: "number",
              description: "The threshold amount to flag transactions above",
            },
          },
          required: ["userId", "threshold"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "get_user_transactions") {
      const userId = args?.userId as string;
      if (!userId) {
        throw new Error("userId is required");
      }
      const transactions = await getUserTransactions(userId);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(transactions, null, 2),
          },
        ],
      };
    } else if (name === "flag_anomalies") {
      const userId = args?.userId as string;
      const threshold = args?.threshold as number;
      if (!userId || threshold === undefined) {
        throw new Error("userId and threshold are required");
      }
      const transactions = await flagAnomalies(userId, threshold);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(transactions, null, 2),
          },
        ],
      };
    } else {
      throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool ${name}: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Local Fintech MCP Server running on stdio");
}

run().catch(console.error);
