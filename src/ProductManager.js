import fs from 'fs'

export class ProductManager {

  constructor(path) {
    this.path = path
  }

  async getProducts(limit) {
    if (fs.existsSync(this.path)) {
      const products = await fs.promises.readFile(this.path, 'utf-8')
      if (limit === 'max') {
        return JSON.parse(products)
      } else {
        return JSON.parse(products).slice(0, limit)
      }
    } else {
      return []
    }
  }

  async getProductById(idProduct) {
    const productos = await this.getProducts()
    const producto = productos.find((e) => e.id === parseInt(idProduct))
    if (producto) {
      return producto
    } else {
      return 'producto no existe'
    }
  }

  async addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  ) {
    const producto = {
      id: await this.#generarId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    }
    const productos = await this.getProducts()
    productos.push(producto)
    await fs.promises.writeFile(this.path, JSON.stringify(productos))
  }

  async #generarId() {
    const productos = await this.getProducts()
    let id = productos.length === 0 ? 1 : productos[productos.length - 1].id + 1
    return id
  }
}


// IDENTACION DE CLASE, CREACION DE ARRAY DE PRODUCTOS


// const products = new ProductManager("products.json");

// const test = async () => {
//   await products.addProduct("product#1", "Producto de prueba", 152, "Sin imagen", "abc321", 25)
//   await products.addProduct("product#2", "Producto de prueba", 141, "Sin imagen", "abc542", 62)
//   await products.addProduct("product#3", "Producto de prueba", 145, "Sin imagen", "cba722", 51)
//   await products.addProduct("product#4", "Producto de prueba", 100, "Sin imagen", "zzz897", 59)
//   await products.addProduct("product#5", "Producto de prueba", 211, "Sin imagen", "uxu256", 29)
//   await products.addProduct("product#6", "Producto de prueba", 305, "Sin imagen", "jfb497", 64)
//   await products.addProduct("product#7", "Producto de prueba", 298, "Sin imagen", "paq157", 47)
//   await products.addProduct("product#8", "Producto de prueba", 97, "Sin imagen", "iou543", 91)
//   await products.addProduct("product#9", "Producto de prueba", 137, "Sin imagen", "wmv751", 67)
//   await products.addProduct("product#10", "Producto de prueba", 266, "Sin imagen", "skc914", 71)
// }

// test();


