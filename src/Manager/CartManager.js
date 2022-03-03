const fs = require('fs');
const pathToProducts = __dirname+'/../files/carts';

class CartManager{
       add=async(cartId,item)=>{
        if(item!==false && !item){
           if(fs.existsSync(pathToProducts)){
               try{
                   let data= await fs.promises.readFile(pathToProducts,'utf-8');
                   let cart=JSON.parse(data);
                   if(cart.length===0){
                        let cartProduct = {"id":1,"timestamp":Date.now(),"products":[]}
                        await fs.promises.writeFile(pathToProducts,JSON.stringify([cartProduct],null,2)) 
                        return {status:"succes", payload:`ID:${cartProduct.id}`} 
                    }
                    const id=cart[cart.length-1].id+1;
                    let cartProduct = {"id":id,"timestamp":Date.now(),"products":[]};
                    cart.push(cartProduct);
                    await fs.promises.writeFile(pathToProducts,JSON.stringify(cart,null,2))
                    return {status:"succes", payload:`ID:${cartProduct.id}`} 
               }catch(error){
                   return {status:"error", error:'holi'}
            }
           }else{
               try{
                   let cartProduct = {"id":1,"timestamp":Date.now(),"products":[]}
                   await fs.promises.writeFile(pathToProducts,JSON.stringify([cartProduct],null,2))
                   return {status:"succes", payload:'ID: 1'} 
               }catch(error){
                 return {status:"error", message:error}
               }
           }

           //// ACA ES ACA ES ACA ES ACA ES 
        }else{
            try{
                if(item!==false){
                    let data= await fs.promises.readFile(pathToProducts,'utf-8');
                    let cart=JSON.parse(data);
                    if(cart.some(res => res.id === parseInt(cartId))){
                    let handlecart = cart.find(res => res.id===parseInt(cartId))
                    let items={
                        "id":item.products[0].id,
                        "timestamp(producto)":Date.now(),
                        "nombre":item.products[0].nombre,
                        "description":item.products[0].descripcion,
                        "codigo":item.products[0].codigo,
                        "foto_url":item.products[0].foto_url,
                        "precio": item.products[0].precio,
                        "stock":item.products[0].stock
                    }
                    handlecart.products.push(items);   
                    await fs.promises.writeFile(pathToProducts,JSON.stringify(cart,null,2))
                    return {status:"success", payload:handlecart}
                    }else{return {status:'error', products:"Don't exist this cart id"}}
                }else {return {status:'error', products:"Don't exist this product id"}}
            }catch(error){return {status:"error", message:error}}
            }

       }
       get = async()=>{
           if(fs.existsSync(pathToProducts)){
                try{
                    let data= await fs.promises.readFile(pathToProducts,'utf-8');
                    let products=JSON.parse(data);
                    return {status:"success", payload: products}
               }catch(error){
                   return {status:"error", error:'error'}
               }
           }else{
               return {status:"error", message:'Don\'t exist file'}
           }
       }   
       delete = async (id)=>{
           if(fs.existsSync(pathToProducts)){
               try{
                   let data = await fs.promises.readFile(pathToProducts,'utf-8')
                   let cart = JSON.parse(data);
                   let secure =  cart.some(product=>product.id===parseInt(id));
                   if(secure){
                        let newcart= cart.filter(cartProduct => cartProduct.id!==parseInt(id))
                        await fs.promises.writeFile(pathToProducts,JSON.stringify(newcart,null,2))
                        return {status:"success", payload:'Deleted Cart'};
                   }else{
                       return {status:"error", message:"The cart never exist"}
                   }
               }catch(err) {
                   return {status:"error", message: "Error"}
               }
           }
           return {status:"failes", message: 'try again later'}
       }
       getById = async(id)=>{
           if(!id) return {status:"failes", message:"Needed an Id"}
           if(fs.existsSync(pathToProducts)){
               try{
                   let data = await fs.promises.readFile(pathToProducts,'utf-8')
                   let cart = JSON.parse(data);
                   if(cart.some(res => res.id === parseInt(id))){
                        let handlecart = cart.find(res => res.id === parseInt(id))
                        let cartProduct = handlecart.products
                       return {status:'success', cartProducts: cartProduct}
                    }
                    return {status:'error', products:"Don't exist this cart id"}
                }catch(error) {
                    return{status:'denied', message: error}
                }
            }return{status:'error', products:"Don't exist file"}
        }
        UploadById = async (cartId, productId) => {
            if(!cartId) return {status:'denied', message:'Needed an Id'}
            if(fs.existsSync(pathToProducts)){
                try{
                    let data = await fs.promises.readFile(pathToProducts,'utf-8')
                    let cart = JSON.parse(data);
                    let secure =  cart.some(product=>product.id===parseInt(cartId));
                    if (secure){   
                        let cartSearch= cart.find(cartProduct => cartProduct.id===parseInt(cartId))
                        let secureProduct = cartSearch.products.some(cartProduct => cartProduct.id===parseInt(productId)); 
                        if(secureProduct){
                            let productSearch = cartSearch.products.filter(cartProduct => cartProduct.id!==parseInt(productId))  
                            let UpdateCart={"id":cartSearch.id,"timestamp":cartSearch.timestamp,"products":productSearch}       
                            let newproducts= cart.map(product => {
                                if(product.id===parseInt(cartId)){
                                    return UpdateCart
                                }else{
                                    return product
                                }
                            })
                            await fs.promises.writeFile(pathToProducts,JSON.stringify(newproducts,null,2))
                            return {status:'success', message: newproducts}
                        }else{return {status:'error', message:"Don't exist this product"}}

                    }else{
                        return {status:'error', message:"Don't exist this cart"}
                    }
                    
                }catch(error){
                    return {status:'error', message: error.message}
                }
            }return {status:'error', message:'Dont exits file'}
        }
}

module.exports=CartManager;