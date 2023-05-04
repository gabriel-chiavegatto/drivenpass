import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
var port = process.env.PORT || 4000;
// import { loadEnv, connectDb, disconnectDB } from '@/config';
var app = express();
app
    .use(cors())
    .use(express.json())
    .get('/health', function (_req, res) { return res.send('OK!'); })
    .listen(port, function () {
    /* eslint-disable-next-line no-console */
    console.log("Server is listening on port ".concat(port, "."));
});
