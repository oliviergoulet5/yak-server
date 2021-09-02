import * as dotenv from "dotenv";
dotenv.config();

export const config = {
    mongoURI: process.env.CONNECTION_STRING || undefined,
}

export type Config = typeof config;
