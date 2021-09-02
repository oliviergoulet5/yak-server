import express from 'express';
import cors from 'cors';
import mongoose = require("mongoose");
import { config } from './config';
import { userRoutes } from './routes';

const main = async () => {

    const app = express();
    const port = 8080;


    if (!config.mongoURI) throw new Error('No connection string found in environment variables.');
    
    mongoose.connect(config.mongoURI, (error) => {
        if (error) throw error;
    });

    app.use(express.json())
    app.use(express.urlencoded())
    app.use(cors());

    app.use(userRoutes);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

main().catch(error => console.error(error));
