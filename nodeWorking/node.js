import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'node:fs'



const app = express()
const port = 2500

const products = fileURLToPath(import.meta.url)
const dirname =  path.dirname(products)

const productsjson = path.join(dirname, 'machineProducts.json') 


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
  
  // FUNCIONA PERO ELIMINA TODO Y DEJA SOLO LO QUE LE PASO.

})

app.listen(port, ()=>{
  console.log('Listening on port 2500');
})