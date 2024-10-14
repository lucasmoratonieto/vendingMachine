import express from "express";
import { createServer } from 'node:http'

const port = process.env.PORT ?? 2000

const app = express()

const server = createServer(app)
app.use(express.static('vending-node'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html')
})

server.listen(port, () =>{
  console.log(`Server listen on port ${port}`);
})