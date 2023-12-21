import express, { Express, Request, Response , Application } from 'express';
import fs from "fs";
import https from "https";
import bodyParser from 'body-parser';
import cors from 'cors';

import { getPoints } from './requests/points.js';

const key = fs.readFileSync("../certs/private.key")
const cert = fs.readFileSync("../certs/certificate.crt")

const cred = {
  key,
  cert
}

const app: Application = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
};

app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.post('/points', async (req: Request, res: Response) => {
  try {
    const { startWeek, endWeek, managerId } = req.body;

    // Validate the presence of required parameters
    if (!startWeek || !endWeek || !managerId) {
      return res.status(400).send('Missing required parameters');
    }

    // Your getPoints function should take startWeek, endWeek, and managerId as arguments
    const totalPoints = await getPoints(startWeek, endWeek, managerId);

    res.send(`${totalPoints}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

const httpsServer = https.createServer(cred, app);
httpsServer.listen(8443);