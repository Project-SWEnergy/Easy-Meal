import type { Config } from "drizzle-kit";

const dotenv = require('dotenv');
dotenv.config();

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;