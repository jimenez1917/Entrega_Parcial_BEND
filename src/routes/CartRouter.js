const express= require('express');
const router=express.Router();
const CartManager= require('../Manager/CartManager');
const ProductsService = new CartManager();
const productsManager= require('../Manager/ProductsManager')
const ProductsSer = new productsManager();
const admin= require('../Admin/admin')
const AdminService = new admin();


let idAdmin=1;
/// Poner idAdmin en 1 para true; en 0 para false;
const Admin = (req, res, next) => {
    AdminService.admin(idAdmin).then(result=>{
        if(result){
            next();
        }else{
            res.status(404).send({error:"Poder",description: "ruta no autrizada", message: 'No estas logeado admin'})
        }
    })
}
router.get('/',Admin,(req,res) =>{
    ProductsService.get().then(result=>res.send(result))
})
router.post('/',Admin,(req,res) =>{
    ProductsService.add().then(result=>res.send({result}));
})
router.delete('/:id',Admin,(req, res)=>{
       ProductsService.delete(req.params.id).then(result=>res.send({result}))
})
router.get('/:id/productos',Admin,(req, res)=>{
    ProductsService.getById(req.params.id).then(result=>res.send({result}))
})
router.post('/:id/productos',Admin,(req, res)=>{
    let body = req.body;
    if(body.productId){
     ProductsSer.getById(body.productId).then(result=>ProductsService.add(req.params.id,result)).then(result=>res.send({result}))
    }else{
        res.send({message:"Tag de producto productID", ejemplo:"{productId:number}"})
    }
})
router.delete('/:id/productos/:id_prod',Admin,(req, res)=>{
    ProductsService.UploadById(req.params.id,req.params.id_prod).then(result=>res.send({result}))
})

module.exports=router;