import express, { Express, Request, Response , Application } from 'express';
import fs from "fs";

const file = fs.readFileSync("./E8A6B107AAFA9A65A739BEA3BB9FBE76.txt")

const app: Application = express();
const port = process.env.PORT || 80;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.get('/.well-known/pki-validation/E8A6B107AAFA9A65A739BEA3BB9FBE76.txt', (req: Request, res: Response) => {
  res.sendFile('/home/fpl-server/E8A6B107AAFA9A65A739BEA3BB9FBE76.txt');

})
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});