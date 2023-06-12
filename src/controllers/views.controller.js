import  CartsService from "../services/carts.service.js";
import  TicketService from "../services/tickets.service.js";
import UserDTO from "../daos/dtos/user.dto.js";


import { productRepository } from "../repositories/index.js";
const cartsService = new CartsService();
const ticketService = new TicketService();


console.log("entro al view.controllers");
//////////////////////////////////////////////////////////////////////////////////////////////

export function login(req, res) {
 
  res.render("login");
};

//////////////////////////////////////////////////////////////////////////////////////////////
export function register(req, res) {
  res.render("register");
};
//////////////////////////////////////////////////////////////////////////////////////////////
export function current(req, res) {
  const userToSave = new UserDTO(req.session.user);
  res.render("profile", { user: userToSave });
};

//////////////////////////////////////////////////////////////////////////////////////////////
export function restore(req, res) {
  res.render("restore");
};
//////////////////////////////////////////////////////////////////////////////////////////////
export function inicio(req, res) {
  res.render("login");
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//muestra todo los productos 
export async function getProducts(req, res) {



   let {limit =2 , page =  1, pCategory, pStatus, sort} = req.query; 
   
  let query ={
    pCategory: pCategory || { $exists: true },
    pStatus: pStatus || { $exists: true },
  }; 
    
  if (sort===1)
  sort={ pPrice:-1};
else
  sort={ pPrice:-1};  
 

 const { docs: productos,  hasPrevPage,  hasNextPage,  nextPage,  prevPage,  totalPages,
} =  await productRepository.getProducts(query,limit,page,pCategory,pStatus,sort); 



return res.render("products", { user:req.session.user , productos,  page,  hasPrevPage,  hasNextPage,  prevPage,  nextPage,  totalPages,});
};

///////////////////////////////////////////////////////////////////////////////////
//muestra un producto
export async function getProductsById(req, res) {
  
  const pId = req.params.pId;
 // console.log("user" + req.user.cart);
  const cId = req.user.cart; 
    const prod =   await productRepository.getProductsById(pId);
   
    res.render("product", { prod, cId });
};


/////////////////////////////////////////////////////////////////////////////////////
export async function getCartsById(req, res) {
  const { cId } = req.params;
 
    const cart =  await cartsService.getCartsById(cId);
  res.render("cart", { cart: cart});
};


//////////////////////////////////////////////////////////////////////////////////////////////

export async function ticket(req,res){
  const { cid }=req.params
  console.log("ticket de view.controller.js" );
  //const ticketFinal= await ticketService.createTickettoCart(cid)
  const ticketFinal= await ticketService.createTicket(cid)

  res.render("ticket", { ticket: ticketFinal });
  /*
  res.render("ticket",{
    ticketFinal: JSON.parse(JSON.stringify(ticketFinal)),
    user: req.session.user
  })*/

}
