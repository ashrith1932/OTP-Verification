import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Replicate __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

export const config = {
  app_password: process.env.app_password || "",
  secret:process.env.SESSION_SECRET,
  gmail:process.env.gmail
};