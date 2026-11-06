// Generated from the BrowserSolver OpenAPI document. Do not edit by hand.

import type { EndpointEntry } from "./types.js";

export const MODE: "catalog" | "tools" = "tools";

export const CATALOG: readonly EndpointEntry[] = [
  {
    name: "stats",
    title: "Stats",
    path: "/v1/stats",
    methods: ["GET"],
    description:
      "Stats. Infrastructure health for an engine or endpoint over the last hour. Not scoped to your account or tenant. Enabled per account: HTTP 403 means contact support to activate it.",
    params: [
      {
        name: "engine",
        type: "string",
        required: false,
        description:
          "API family to check, for example website. Provide at least engine or path.",
      },
      {
        name: "path",
        type: "string",
        required: false,
        description:
          "Specific endpoint to check, for example /v1/website/screenshot. If you also pass engine, use an endpoint from that API.",
      },
    ],
  },
  {
    name: "usage",
    title: "Usage",
    path: "/v1/usage",
    methods: ["GET"],
    description:
      "Usage. Retrieve real-time usage statistics and credit balance for your BrowserSolver account.",
    params: [],
  },
  {
    name: "website_antibot",
    title: "Website Antibot",
    path: "/v1/website/antibot",
    methods: ["GET"],
    description:
      "Website Antibot. Single-pass scan that names the bot-protection vendor in front of a URL so you can choose the right BrowserSolver fetch tier next. Credit cost: 1 credit per call.",
    params: [
      {
        name: "query",
        type: "string",
        required: true,
        description:
          "Full URL or bare domain to scan for bot-protection vendors.",
      },
      {
        name: "timeout",
        type: "number",
        required: false,
        description:
          "Upper bound for waiting on the target HTTP response, expressed in seconds (defaults to 15).",
      },
      {
        name: "fields",
        type: "string",
        required: false,
        description:
          "Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost.",
      },
    ],
  },
  {
    name: "website_crawler",
    title: "Website Crawler",
    path: "/v1/website/crawler",
    methods: ["GET", "POST"],
    description:
      "Website Crawler. Fast HTTP pull of public HTML with no browser session. Ideal when the first response already contains the content you need. Credit cost: 1 credit per call.",
    params: [
      {
        name: "query",
        type: "string",
        required: true,
        description:
          "Public URL to retrieve with the Crawler tier (plain HTTP, no JavaScript). Include http:// or https://.",
      },
      {
        name: "allow_redirects",
        type: "boolean",
        required: false,
        description:
          "Whether BrowserSolver should chase HTTP redirects for this fetch.",
        default: true,
      },
      {
        name: "return_page_source",
        type: "boolean",
        required: false,
        description:
          "Choose between processed markup and the exact bytes from the origin.",
        default: false,
      },
      {
        name: "fields",
        type: "string",
        required: false,
        description:
          "Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost.",
      },
    ],
  },
  {
    name: "website_rendering",
    title: "Website Rendering",
    path: "/v1/website/rendering",
    methods: ["GET"],
    description:
      "Website Rendering. Run a managed browser session against a public URL and collect the HTML after client-side scripts finish. Prefer Crawler for static markup; escalate to WebUnlocker on approved hosts when challenges persist. Credit cost: 2 credits per call.",
    params: [
      {
        name: "query",
        type: "string",
        required: true,
        description:
          "Public URL to load inside BrowserSolver's headless browser. Include http:// or https://.",
      },
      {
        name: "wait_in_seconds",
        type: "number",
        required: false,
        description:
          "Extra pause, in seconds, after the page load event before BrowserSolver returns HTML. Helpful when widgets animate or hydrate late.",
        default: 0,
      },
      {
        name: "wait_for",
        type: "string",
        required: false,
        description:
          "CSS or XPath selector that must appear in the DOM before HTML is returned. The managed browser waits until the node exists (or until timeout).",
      },
      {
        name: "block_ads",
        type: "boolean",
        required: false,
        description: "Skip ad-network requests while the page renders.",
        default: false,
      },
      {
        name: "timeout",
        type: "number",
        required: false,
        description:
          "Hard ceiling, in seconds, for the render session. When reached, BrowserSolver returns whatever HTML is available.",
        default: 30,
      },
      {
        name: "fields",
        type: "string",
        required: false,
        description:
          "Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost.",
      },
    ],
  },
  {
    name: "website_screenshot",
    title: "Website Screenshot",
    path: "/v1/website/screenshot",
    methods: ["GET", "POST"],
    description:
      "Website Screenshot. Turn any public URL into a PNG, JPEG, WebP, or PDF asset rendered by BrowserSolver. No local Chromium fleet to operate. Credit cost: 2 credits per call.",
    params: [
      {
        name: "url",
        type: "string",
        required: true,
        description:
          "Page address to render into an image or PDF. Must include a protocol.",
      },
      {
        name: "format",
        type: "string",
        required: false,
        description: "File type returned in the response body.",
        enum: ["jpeg", "jpg", "pdf", "png", "webp"],
        default: "png",
      },
      {
        name: "device",
        type: "string",
        required: false,
        description:
          "Swap the desktop viewport for a preset handset or tablet fingerprint.",
        enum: [
          "galaxy_fold4",
          "galaxy_s23",
          "galaxy_s23_ultra",
          "galaxy_s8",
          "huawei_mate_50_pro",
          "huawei_p60_pro",
          "ipad",
          "iphone_12",
          "iphone_13_mini",
          "iphone_13_pro_max",
          "iphone_14_pro",
          "iphone_14_pro_max",
          "iphone_x",
          "pixel_5",
          "pixel_6a",
          "pixel_7_pro",
          "redmi_note_11",
          "redmi_note_12_pro",
        ],
      },
      {
        name: "full_page",
        type: "boolean",
        required: false,
        description:
          "Extend the capture beyond the viewport so the entire scrollable document is included.",
        default: false,
      },
      {
        name: "full_page_scroll",
        type: "boolean",
        required: false,
        description:
          "Drive a scroll pass first so deferred content mounts before a tall capture.",
        default: false,
      },
      {
        name: "full_page_scroll_duration",
        type: "number",
        required: false,
        description:
          "Milliseconds spent scrolling prior to a full-height capture.",
        default: 400,
      },
      {
        name: "viewport_width",
        type: "number",
        required: false,
        description: "Width of the synthetic desktop window, in pixels.",
        default: 1280,
      },
      {
        name: "viewport_height",
        type: "number",
        required: false,
        description: "Height of the synthetic desktop window, in pixels.",
        default: 1024,
      },
      {
        name: "scale_factor",
        type: "number",
        required: false,
        description:
          "Pixel density multiplier. Raise it for retina-quality output; files grow accordingly.",
        default: 1,
      },
      {
        name: "image_quality",
        type: "string",
        required: false,
        description: "Lossy compression level for soft formats.",
        default: "80",
      },
      {
        name: "selector",
        type: "string",
        required: false,
        description:
          "Limit the shot to one DOM node matched by this CSS selector.",
      },
      {
        name: "cache",
        type: "boolean",
        required: false,
        description:
          "Serve a stored capture on repeat requests when caching is enabled.",
        default: false,
      },
      {
        name: "cache_ttl",
        type: "number",
        required: false,
        description: "Lifetime of cached captures in seconds.",
        default: 2592000,
      },
      {
        name: "remove_selectors",
        type: "string",
        required: false,
        description:
          "Hide matching CSS selectors (modals, promo bars, etc.) before shooting.",
      },
      {
        name: "remove_cookie_banners",
        type: "boolean",
        required: false,
        description:
          "Best-effort removal of cookie consent layers before capture.",
        default: false,
      },
      {
        name: "remove_ads",
        type: "boolean",
        required: false,
        description: "Best-effort stripping of ad slots before capture.",
        default: false,
      },
      {
        name: "block_resources",
        type: "string",
        required: false,
        description:
          "Resource kinds to discard during load, as a comma list (example: image,stylesheet,font).",
        enum: [
          "document",
          "eventsource",
          "fetch",
          "font",
          "image",
          "manifest",
          "media",
          "other",
          "script",
          "stylesheet",
          "texttrack",
          "websocket",
          "xhr",
        ],
      },
      {
        name: "block_urls",
        type: "string",
        required: false,
        description:
          "Substring patterns that should never be fetched (example: analytics,tracking,advertisement). Hosts, paths, or fragments such as .example.com/ work.",
      },
      {
        name: "delay",
        type: "number",
        required: false,
        description:
          "Additional settle time in seconds after the readiness event.",
        default: 0,
      },
      {
        name: "wait_until",
        type: "array",
        required: false,
        description: "Which browser lifecycle event marks the page ready.",
        items: "string",
        enum: ["domcontentloaded", "load", "networkidle0", "networkidle2"],
      },
      {
        name: "wait_for_selector",
        type: "string",
        required: false,
        description: "Hold capture until this CSS node is present.",
      },
      {
        name: "proxy",
        type: "string",
        required: false,
        description: "Route the browser through an intermediate proxy.",
      },
      {
        name: "s3_secret_key",
        type: "string",
        required: false,
        description: "Secret key used to authenticate uploads.",
      },
      {
        name: "s3_access_key_id",
        type: "string",
        required: false,
        description: "Access key used to authenticate uploads.",
      },
      {
        name: "s3_bucket",
        type: "string",
        required: false,
        description: "Destination bucket for the binary asset.",
      },
      {
        name: "s3_object_key",
        type: "string",
        required: false,
        description:
          "Key under which the object is stored (generated automatically if blank).",
      },
      {
        name: "s3_region",
        type: "string",
        required: false,
        description: "Cloud region of the bucket.",
      },
      {
        name: "storage_endpoint",
        type: "string",
        required: false,
        description:
          "Override the default AWS endpoint for S3-compatible backends. Leave blank for AWS. R2 example: https://<accountId>.r2.cloudflarestorage.com.",
      },
      {
        name: "s3_url",
        type: "boolean",
        required: false,
        description:
          "Upload the binary and include the public object URL in the API response.",
        default: false,
      },
      {
        name: "fields",
        type: "string",
        required: false,
        description:
          "Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost.",
      },
    ],
  },
  {
    name: "website_technology",
    title: "Website Technology",
    path: "/v1/website/technology",
    methods: ["GET", "POST"],
    description:
      "Website Technology. Map CMS, frameworks, analytics, CDN, and security tooling exposed by a public URL. Choose simple lists or expert metadata with confidence scores. Credit cost: 1 credit per call.",
    params: [
      {
        name: "query",
        type: "string",
        required: true,
        description:
          "Public URL to fingerprint for CMS, frameworks, analytics, CDN, and security tooling. Include http:// or https://.",
      },
      {
        name: "mode",
        type: "string",
        required: false,
        description: "How much detail to include in the stack report.",
        default: "expert",
      },
      {
        name: "fields",
        type: "string",
        required: false,
        description:
          "Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost.",
      },
    ],
  },
  {
    name: "website_webunlocker",
    title: "Website WebUnlocker",
    path: "/v1/website/webunlocker",
    methods: ["GET", "POST"],
    description:
      "Website WebUnlocker. BrowserSolver's highest HTML fetch tier for retail and marketplace hosts on your account whitelist. Solves persistent bot challenges that still block Rendering. Credit cost: 3 credits per call.",
    params: [
      {
        name: "query",
        type: "string",
        required: true,
        description:
          "Public URL to fetch with the WebUnlocker tier. Include http:// or https://. The hostname must be on your BrowserSolver whitelist.",
      },
      {
        name: "allow_redirects",
        type: "boolean",
        required: false,
        description: "Whether the unlock session should chase HTTP redirects.",
        default: true,
      },
      {
        name: "return_page_source",
        type: "boolean",
        required: false,
        description:
          "Choose between processed markup and the exact post-unlock source.",
        default: false,
      },
      {
        name: "fields",
        type: "string",
        required: false,
        description:
          "Comma-separated list of fields to keep in the response, with dot notation for nested fields (e.g. name,location.city). Does not change the credit cost.",
      },
    ],
  },
];
