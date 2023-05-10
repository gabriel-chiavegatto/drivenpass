
import express, { Express } from 'express';
import { connectDb, disconnectDB } from './config/database';
import { userRouter } from './routers/userRouter';
import { credentialRouter } from './routers/credentialRouter';
import { networkRouter } from './routers/networkRouter';
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
