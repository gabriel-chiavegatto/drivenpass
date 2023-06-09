
import express, { Express } from 'express';
import { connectDb, disconnectDB } from './config/database.js';
import { userRouter } from './routers/userRouter.js';
import { credentialRouter } from './routers/credentialRouter.js';
import { networkRouter } from './routers/networkRouter.js';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config()

const port = process.env.PORT || 4000;

const app = express();

app
    .use(cors())
    .use(express.json())
    .get('/health', (_req, res) => res.send('OK!'))
    .use('/user', userRouter)
    .use("/credential", credentialRouter)
    .use("/network", networkRouter)

export function init():Promise<Express>{
    connectDb();
    return Promise.resolve(app);
}

export async function close():Promise<void> {
    await disconnectDB();
}

export default app
