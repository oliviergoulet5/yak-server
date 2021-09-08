import express from 'express';
import cors from 'cors';
import session from 'express-session';
import mongoose = require("mongoose");
import MongoStore from 'connect-mongo';
import { config } from './config';
import { userRoutes, authRoutes } from './routes';

const main = async () => {
    const app = express();
    const port = 8080;


    if (!config.mongoURI) throw new Error('No connection string found in environment variables.');
    if (!config.sessions.dbName || 
        !config.sessions.user.collectionName || 
        !config.sessions.user.secret
    ) throw new Error('Session information not specified.')
    
    mongoose.connect(config.mongoURI, (error) => {
        if (error) throw error;
    });

    app.use(session({
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 24*60*60*1000,
            secure: app.get("env") === "development" ? false : true,
            sameSite: app.get("env") === "development" ? true : 'none',
        },
        name: 'ycast',
        saveUninitialized: false,
        secret: config.sessions.user.secret,
        store: MongoStore.create({
            dbName: config.sessions.dbName,
            collectionName: config.sessions.user.collectionName,
            mongoUrl: config.sessions.mongoURI
        }),
    }));

    app.use(cors({
        credentials: true, 
        origin: 'http://localhost:3000',
    }));

    app.use(express.json())
    app.use(express.urlencoded())

    app.use(userRoutes);
    app.use(authRoutes);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

main().catch(error => console.error(error));
