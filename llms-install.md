# Installing the BrowserSolver MCP server

Instructions for AI agents installing this server for a user.

1. Check that Node.js 20 or newer is available (`node --version`).
2. Ask the user for their BrowserSolver API key. They can create one at https://app.browsersolver.com/register and copy it from https://app.browsersolver.com.
   Never print the key back or commit it to a file in a repository.
3. Prefer the hosted server: add it with URL `https://mcp.browsersolver.com/` and the header `x-api-key: <key>`:

```json
{
  "mcpServers": {
    "browsersolver": {
      "url": "https://mcp.browsersolver.com/",
      "headers": {
        "x-api-key": "YOUR_API_KEY"
      }
    }
  }
}
```

Or run it locally over stdio:

```json
{
  "mcpServers": {
    "browsersolver": {
      "command": "npx",
      "args": ["-y", "@browsersolver/mcp"],
      "env": {
        "BROWSERSOLVER_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

4. Restart the client and check that the `stats` tool is listed.

The server needs no other configuration. Each tool call that reaches the API consumes BrowserSolver credits.
