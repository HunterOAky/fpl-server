import express, { Express, Request, Response , Application } from 'express';
import fs from "fs";
import https from "https";

const key = fs.readFileSync("../certs/private.key")
const cert = fs.readFileSync("../certs/certificate.crt")

const cred = {
  key,
  cert
}

const app: Application = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

const httpsServer = https.createServer(cred, app);
httpsServer.listen(8443);