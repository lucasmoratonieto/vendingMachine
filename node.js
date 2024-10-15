import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';


const app = express()
const port = 2500

const products = fileURLToPath(import.meta.url)
const dirname =  path.dirname(products)

const productsjson = path.join(dirname, 'machineProducts.json') 


app.use(express.static('public'))
app.use(express.json())

app.get('/info/lucas', (req, res) => {
  const { dynamic } = req.params
  const { key } = req.query
  console.log(dynamic, key);
  // res.status(200).json({info: 'preset text 🐮'})
  res.sendFile(productsjson)
})

app.post('/', (req, res) =>{
  const { product } = req.body
  console.log(product);
  if(!product){
    return res.status(400).send({status:'failed'})
  }
  res.status(200).send({status:'received', product: product})
})

app.listen(port, ()=>{
  console.log('Listening on port 2500');
})