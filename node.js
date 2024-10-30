import express from 'express'
import { createClient } from "@libsql/client";

import dotenv from 'dotenv';
dotenv.config()


const app = express()

const db = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
})

const port = process.env.PORT ?? 2400

app.use(express.static('public'))
app.use(express.json())



  //Getting info from de data base
  app.get('/products', async (req, res) => {
    
    try{
       const result = await db.execute("SELECT * FROM products")
       res.json(result.rows)
      //  console.log(result.rows)
    
      // console.log(result.rows)
    } catch (e){
      console.log(e)
    }
   
  
  })
  
app.post('/', async (req, res) =>{
  
  console.log('This is the req.body.product', req.body.product)
  let product = req.body.product
  let cuantity = product.productCuantity
  let number = product.productNumber
  console.log(product.productNumber,product.productName,product.productPrice, product.productCuantity)
  // console.log(typeof(req.body.product.productName))
  if(!product){
    return res.status(400).send({status:'failed'})
  }
  res.status(200).send({status:'received', product})

  const postResult = await db.execute(
    // "INSERT INTO products(productNumber, productName, productPrice, productCuantity) values (1, 'Coke', 2.5, 47)"
    "UPDATE products SET productCuantity =  ? WHERE productNumber = ?",
    [cuantity, number]

  )
})

app.listen(port, ()=>{
  console.log(`Listening on port: http://localhost:${port}`)
})






//-------------------------------TEST DB----------------------------




