# BrowserSolver MCP Server

Official [Model Context Protocol](https://modelcontextprotocol.io) server for the [BrowserSolver](https://www.browsersolver.com) web unlocker API.

Unlock, render, crawl and screenshot any website — anti-bot bypass and technology detection through one API.

It lets Claude, Cursor, VS Code, Windsurf and any MCP client call the API as tools. Runs over **stdio** (local) or **Streamable HTTP** (self-hosted).

## Requirements

- Node.js 20 or newer
- a BrowserSolver API key — [sign up](https://app.browsersolver.com/register), then copy it from the [dashboard](https://app.browsersolver.com)

## Hosted server (recommended)

BrowserSolver runs this server for you at **`https://mcp.browsersolver.com/`** (Streamable HTTP). Send your API key in the `x-api-key` header; nothing to install.

```sh
claude mcp add --transport http browsersolver https://mcp.browsersolver.com/ --header "x-api-key: YOUR_API_KEY"
```

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

The hosted server and this package expose the same API; run the package locally when you want stdio, your own network egress, or to self-host it.

## Run it locally

### Claude Code

```sh
claude mcp add browsersolver --env BROWSERSOLVER_API_KEY=YOUR_API_KEY -- npx -y @browsersolver/mcp
```

### Claude Desktop, Cursor, Windsurf and other clients

Add the server to the client's MCP configuration (`claude_desktop_config.json`, `.cursor/mcp.json`…):

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

### VS Code

```json
{
  "servers": {
    "browsersolver": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@browsersolver/mcp"],
      "env": {
        "BROWSERSOLVER_API_KEY": "${input:browsersolver-api-key}"
      }
    }
  },
  "inputs": [
    {
      "type": "promptString",
      "id": "browsersolver-api-key",
      "description": "BrowserSolver API key",
      "password": true
    }
  ]
}
```

### Claude Desktop extension

Download the `.mcpb` bundle from the releases page and open it; Claude Desktop asks for your API key.

### Docker

```sh
docker build -t browsersolver-mcp .
docker run -i --rm -e BROWSERSOLVER_API_KEY=YOUR_API_KEY browsersolver-mcp
```

## Tools

| Tool                  | Description                                                                                                                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stats`               | Infrastructure health for an engine or endpoint over the last hour. Not scoped to your account or tenant. Enabled per account: HTTP 403 means contact support to activate it.                            |
| `usage`               | Retrieve real-time usage statistics and credit balance for your BrowserSolver account.                                                                                                                   |
| `website_antibot`     | Single-pass scan that names the bot-protection vendor in front of a URL so you can choose the right BrowserSolver fetch tier next.                                                                       |
| `website_crawler`     | Fast HTTP pull of public HTML with no browser session. Ideal when the first response already contains the content you need.                                                                              |
| `website_rendering`   | Run a managed browser session against a public URL and collect the HTML after client-side scripts finish. Prefer Crawler for static markup; escalate to WebUnlocker on approved hosts when challenges p… |
| `website_screenshot`  | Turn any public URL into a PNG, JPEG, WebP, or PDF asset rendered by BrowserSolver. No local Chromium fleet to operate.                                                                                  |
| `website_technology`  | Map CMS, frameworks, analytics, CDN, and security tooling exposed by a public URL. Choose simple lists or expert metadata with confidence scores.                                                        |
| `website_webunlocker` | BrowserSolver's highest HTML fetch tier for retail and marketplace hosts on your account whitelist. Solves persistent bot challenges that still block Rendering.                                         |

Every tool that calls the API consumes credits. JSON results are returned as text; images are returned inline and other files (PDF…) as embedded resources, up to 4 MB.

## Streamable HTTP

```sh
npx @browsersolver/mcp --http --port 3000
```

The endpoint is `POST /mcp` (stateless, JSON responses). Each client sends its own key in the `x-api-key` header (or `Authorization: Bearer <key>`); the server never uses a key of its own. It binds to `127.0.0.1` by default and rejects browser origins unless you allow them — put it behind TLS before exposing it.

`createHttpHandler()` is exported for Fetch-compatible runtimes (Cloudflare Workers, Deno, Bun):

```ts
import { createHttpHandler } from "@browsersolver/mcp";

export default { fetch: createHttpHandler({ allowedOrigins: [] }) };
```

## Security

- The API key is read from `BROWSERSOLVER_API_KEY` (stdio) or the request headers (HTTP) and removed from error messages.
- Content fetched from websites is untrusted: the server instructions tell the model to treat it as data, not instructions.
- See [SECURITY.md](SECURITY.md) to report a vulnerability.

## Development

```sh
npm install
npm test
npm run build
npx @modelcontextprotocol/inspector node dist/stdio.js
```

## Built on the SDK

The server uses the official [Node.js SDK](https://github.com/browsersolver/browsersolver-node) (`@browsersolver/sdk`).

## All BrowserSolver SDKs

| SDK        | Package                                                                            | Install                                            |
| ---------- | ---------------------------------------------------------------------------------- | -------------------------------------------------- |
| Node.js    | [`@browsersolver/sdk`](https://www.npmjs.com/package/@browsersolver/sdk)           | `npm install @browsersolver/sdk`                   |
| Python     | [`browsersolver`](https://pypi.org/project/browsersolver/)                         | `pip install browsersolver`                        |
| Go         | [`browsersolver-go`](https://pkg.go.dev/github.com/browsersolver/browsersolver-go) | `go get github.com/browsersolver/browsersolver-go` |
| .NET       | [`BrowserSolver`](https://www.nuget.org/packages/BrowserSolver)                    | `dotnet add package BrowserSolver`                 |
| Ruby       | [`browsersolver`](https://rubygems.org/gems/browsersolver)                         | `gem install browsersolver`                        |
| PHP        | [`browsersolver/sdk`](https://packagist.org/packages/browsersolver/sdk)            | `composer require browsersolver/sdk`               |
| Java       | [`browsersolver-java`](https://github.com/browsersolver/browsersolver-java)        | build from source, see its README                  |
| CLI        | [`@browsersolver/cli`](https://www.npmjs.com/package/@browsersolver/cli)           | `npm install -g @browsersolver/cli`                |
| MCP server | [`@browsersolver/mcp`](https://www.npmjs.com/package/@browsersolver/mcp)           | `npx -y @browsersolver/mcp`                        |

## License

MIT — see [LICENSE](LICENSE).
