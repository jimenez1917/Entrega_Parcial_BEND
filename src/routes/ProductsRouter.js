const express= require('express');
const router=express.Router();
const ProductsManager = require('../Manager/ProductsManager');
const ProductsService = new ProductsManager();
const admin=require('../Admin/admin')
const AdminService = new admin();


let idAdmin=1;
/// Poner idAdmin en 1 para true; en 0 para false;
const Admin = (req, res, next) => {
    AdminService.admin(idAdmin).then(result=>{
        console.log (result);
        if(result){
            next();
        }else{
            res.status(404).send({error:-1,description: "ruta no autrizada", message: 'No estas logeado admin'})
        }
    })
}

router.get('/',(req,res) =>{
    ProductsService.get().then(result=>res.send(result))
})

router.post('/',Admin,(req,res) =>{
    //seguridad de body
    let product =req.body;
    console.log(product.nombre)
    ProductsService.add(product).then(result=>res.send({result}));
})
router.delete('/:id',Admin,(req, res)=>{
    ProductsService.delete(req.params.id).then(result=>res.send({result}))
})
router.get('/:id',(req, res)=>{
    //seguridad de parametros
    ProductsService.getById(req.params.id).then(result=>res.send({result}))
})
router.put('/:id',Admin,(req, res)=>{
    //seguridad de body
    let bodi=req.body;
    ProductsService.UploadById(req.params.id,bodi).then(result=>res.send({result}))
})

module.exports=router;