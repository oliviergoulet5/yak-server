import * as dotenv from "dotenv";
dotenv.config();

export const config = {
    mongoURI: process.env.CONNECTION_STRING || undefined,
    sessions: {
        dbName: process.env.SESSION_DB_NAME || undefined,
        mongoURI: process.env.SESSION_CONNECTION_STRING,
        user: { 
            collectionName: process.env.SESSION_USER_COLLECTION_NAME || undefined,
            secret: process.env.SESSION_USER_SECRET || undefined,
        }
    }
}

export type Config = typeof config;
