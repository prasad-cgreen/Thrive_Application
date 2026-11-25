import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// ../.env.local: the Neon database URLs (DATABASE_URL_UNPOOLED), see README "Run locally".
config({ path: [".env", "../.env.local", "../frontend/.env.local"], quiet: true });

// The app's data lives in thrive_app (like Relive's relive_app) on that host, whatever database the URL names.
// Same as src/config/env.ts databaseUrl().
function appUrl() {
  const source = process.env.DATABASE_URL_UNPOOLED;
  if (!source) throw new Error("DATABASE_URL_UNPOOLED is required");
  const url = new URL(source);
  url.pathname = "/thrive_app";
  return url.toString();
}

export default defineConfig({
  schema: "prisma/production/schema.prisma",
  migrations: { path: "prisma/production/migrations" },
  datasource: { url: appUrl() },
});
