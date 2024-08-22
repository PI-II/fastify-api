import "dotenv/config";
import type { PoolOptions } from "mysql2";

export const DB = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PWD,
  database: process.env.DB_SCHEMA,
} satisfies PoolOptions;
export const PORT = Number(process.env.PORT) || 3000;
export const HOST = process.env.HOST || "localhost";
