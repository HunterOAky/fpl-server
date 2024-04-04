import express, { Express, Request, Response, Application } from 'express';
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
  origin: ['http://localhost:3001', 'http://localhost:3000', "https://main.dtbdogmykmx3l.amplifyapp.com"], 
};

app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.post('/points', async (req: Request, res: Response) => {
  try {
    const requestData = req.body as Record<string, string>;

    // For demonstration, simply sending back the received data
    res.json(await getPoints(requestData));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to serve the Auth File
app.get('/.well-known/pki-validation/74988D8E6822558FA4B73AB82A09D1AB.txt', (req: Request, res: Response) => {
  const filePath = '../74988D8E6822558FA4B73AB82A09D1AB.txt';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.type('text/plain').send(data);
    }
  });
});

const httpsServer = https.createServer(cred, app);
httpsServer.listen(80);
