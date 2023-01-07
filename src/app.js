// IMPORTACION MODULO EXPRESS Y CLASE PRODUCTMANAGER

import express from 'express'
import { ProductManager } from './ProductManager.js'

const app = express()
const productManager = new ProductManager('products.json')


// ASIGNACION DE RUTAS (ENDPOINTS)

app.get('/products', async (req,res)=>{
    const {limit} = req.query
    const productos = await productManager.getProducts(limit || 'max')
    res.json({ productos }) 
})

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params
    const product = await productManager.getProductById(pid)
    res.json({ product })
  })
  

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
  })