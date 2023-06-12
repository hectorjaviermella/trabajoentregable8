import { ticketRepository } from "../repositories/index.js";
import { cartRepository } from "../repositories/index.js";
import { productRepository } from "../repositories/index.js";
import { userRepository } from "../repositories/index.js";
import { faker } from '@faker-js/faker';

import TicketDTO from "../daos/dtos/ticket.dto.js";
//import UsersRepository from "../repositories/users.repository.js";

export default class TicketService {
  constructor() {}

///////////////////////////////////////////////////////////

 async getTicket() {
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log(" tickets.service.js  en getTicket")
    const tickets = await ticketRepository.getTickets();
 
    return tickets;
  }

////////////////////////////////////////////////////////////////////////
async getTicketsById(tId) {
    const ticket = await ticketRepository.getTicketsById(tId);
    return ticket;
  }
////////////////////////////////////////////////////////////////////////


async updateTicket(tId,ticketnuevo) {
    const createdProduct =  await ticketRepository.updateTicket(pId,ticketnuevo);
    return createdProduct;
  }
////////////////////////////////////////////////////////////////////////

async deleteTicket(tId) {
    const result = await ticketRepository.deleteTicket(tId);
    return result;
  }
  



/////////////////////////////////////////////////////////////////////////////////////
/*async createTicket(ticket) {
  console.log("estaoy ticket.service en el create xxx")

    const result = await ticketRepository.createTicket(ticket);
    return result;
  }

*/
  //////////////////////////////////////////////////////////////////////////////////////////////
  async createTicket(cId) {
    try {
          console.log("createTicket de ticket.service xxx");      

        // Genera un código de cadena único utilizando Faker.js
          //const codigoUnico = faker.random.uuid();
          const codigoUnico = faker.lorem.word();

        //recuperar el carrito con los productos 
        const cart = await cartRepository.getCartsById(cId);
        const user = await userRepository.getUsersById(cId);

        
       
        let productscar = cart.products;
       
       let amount=0;
    
      const  arrayproductsnocomprados = [];
      const  arrayproductscomprados = [];
     
       //recorro los productos del carrito
       for (let i = 0; i < productscar.length; i++) {
        
        let productcar = productscar[i];        
        //recupero el producto original
        let productstock = await productRepository.getProductsById(productcar.pId._id);  
     
        //comparo stock
       if ((productstock.pStock - productcar.quantity)>=0){
                //hay stock para la venta
         productstock.pStock = productstock.pStock - productcar.quantity;
       
         //actualizo el stock 
         const resultupdate= await productRepository.updateProducto(productstock._id,productstock);
        

         //sumo cantidad de valor de producto por la cantidad pedida
         amount= amount + (productstock.pPrice *  productcar.quantity);
        
         //eliminar del carrito el producto
         const resultdelete  = await cartRepository.deleteProductToCart(cId,productstock._id);
     
         arrayproductscomprados.push(productcar.quantity + " unidades " + productcar.pId.pTitle);   
         
      
       }else
       {
         //no hay stock para la venta
         arrayproductsnocomprados.push(productcar.pId.pTitle);       

       }

      }//cierra el for
  
   
      if (arrayproductscomprados.length>0){   
                 
                let purcharser =user.email;
              
                const ticket = {
                            cId: cId,
                            code: codigoUnico,                 
                            amount: amount ,
                            purcharser: purcharser,
                            arrayproductscomprados:arrayproductscomprados,
                            arrayproductsnocomprados:arrayproductsnocomprados,

                };
             
                const createdTicket = await ticketRepository.createTicket(ticket);
                                
                console.log("xxxxxx ticket creado ",createdTicket);
                if (!createdTicket) {
                  //no se creo el carrito.
                return res
                  .status(400)
                  .send({ status: "error", message: "Error to create ticket",payload: error });
              }else{
                console.log("tendria que devolver resultado", createTicket);
                 return createTicket;
               // return res.send({ status: "success", message: "ticket created", payload: createdTicket});
                //res.render("ticket");
               // console.log("XXXXXXXXXXXXX antes del render" , createdTicket);
               // res.render("ticket", { ticket: createdTicket });
              }


              //return res.send({ status: "success", message: "ticket created", payload: createdTicket});
              
                                }else{
                             return res.send({ status: "error", message: "Do not ticket created", payload: error});
              
                                }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
////////////////////////////////////////////////////////////////////////

}