import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs'
import { createClient } from "@libsql/client";
import { create } from 'domain';




const app = express()
const port = process.env.PORT ?? 2500

// db = createClient({
//   url: "",
//   authToken: process.env.DB_TOKEN
// })

const products = fileURLToPath(import.meta.url)
const dirname =  path.dirname(products)

const productsjson = path.join(dirname, './public/machineProducts.json') 


app.use(express.static('public'))
app.use(express.json())

app.get('/products', (req, res) => {
   res.sendFile(productsjson)
})

app.post('/', (req, res) =>{
  
  // const { buttonPressed } = req.buttonPressed
  const { product } = req.body
  // console.log(buttonPressed)
  // console.log(product)
  if(!product){

    return res.status(400).send({status:'failed'})
  }
  res.status(200).send({status:'received', product})
  
  fs.readFile(productsjson, 'utf-8', (err, data) =>{
      if (err) {
        console.log(err)
        return
      } else {
         const jsonData = JSON.parse(data)
         
         
         
         for (let i = 1; i <= Object.keys(jsonData).length; i++){
          if (jsonData[i].product == product.product){
            console.log("son iguales")
            console.log(jsonData[i])
            console.log(product)

            jsonData[i].cuantity = jsonData[i].cuantity - 1
            console.log(jsonData)
            fs.writeFile(productsjson, JSON.stringify(jsonData), err =>{
              if (err) {
                console.log(err)
              } else {
                console.log("all ok")
              }
            })
            return
          } else {
            console.log("no")
            console.log(jsonData[i])
            console.log(product)
          }
         }
      }
    })
})

app.listen(port, ()=>{
  console.log(`Listening on port: https://localhost:${port}`)
})