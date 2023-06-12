//import { productsrepository } from "../repositories/products.repository.js";
import { productRepository } from "../repositories/index.js";
import ProductDTO from "../daos/dtos/product.dto.js";

export default class ProductsService {
  constructor() {}

///////////////////////////////////////////////////////////

 async getProducts(query,limit,page,pCategory,pStatus,sort) {
  
    const products = await productRepository.getProducts(query,limit,page,pCategory,pStatus,sort);
 
    return products;
  }

////////////////////////////////////////////////////////////////////////
async getProductsById(pId) {
    const product = await productRepository.getProductsById(pId);
    return product;
  }
////////////////////////////////////////////////////////////////////////

async addProduct(product) {
  console.log(" xxx entro al procuts.service al addproduct");
    //const productToSave = new ProductDTO(product);
    const result = await productRepository.addProduct(product);
    return result;
  }
////////////////////////////////////////////////////////////////////////

async updateProducto(pId,productonuevo) {
    console.log("updaterproduct de products.service ");
    const createdProduct =  await productRepository.updateProducto(pId,productonuevo);
    return createdProduct;
  }
////////////////////////////////////////////////////////////////////////

async deleteProduct(pId) {
    
    const result = await productRepository.deleteProduct(pId);
    return result;
  }



/////////////////////////////////////////////////////////////////////////////////////
}