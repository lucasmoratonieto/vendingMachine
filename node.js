import express from 'express'

const app = express()
const port = 2500

app.use(express.static('public'))
app.use(express.json())

app.get('/info/:dynamic', (req, res) => {
  const { dynamic } = req.params
  const { key } = req.query
  console.log(dynamic, key);
  res.status(200).json({info: 'preset text 🐮'})
})

app.post('/', (req, res) =>{
  const { product } = req.body
  console.log(product);
  if(!product){
    return res.status(400).send({status:'failed'})
  }
  res.status(200).send({status:'received', productz2 s<w1x:product})
})

app.listen(port, ()=>{
  console.log('Listening on port 2500');
})