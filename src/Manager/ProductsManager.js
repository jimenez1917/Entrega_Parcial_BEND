const fs = require('fs');
const pathToProducts = __dirname+'/../files/products';

class ProductsManager{
        add=async(product)=>{
           if(fs.existsSync(pathToProducts)){
               try{
                    if(product.nombre && product.descripcion && product.codigo && product.foto_url && product.precio && product.stock ){
                        let data= await fs.promises.readFile(pathToProducts,'utf-8');
                        let products=JSON.parse(data);
                        if(products.length===0){
                            product.id=1;
                            products.push(product);
                            fs.promises.writeFile(pathToProducts,JSON.stringify(products,null,2))   
                            return {status:"succes", payload:'Added first product'}                    
                        }
                        product.id= products[products.length-1].id+1;
                        products.push(product);
                        await fs.promises.writeFile(pathToProducts,JSON.stringify(products,null,2));
                        return {status:"success",payload:`added product`}
                        }else{
                            return {status:"error", payload:"Envia el siguiente body={nombre,descripción,codigo,foto(url),precio,stock o tienes un campo vación"}
                        }
                }catch(error){
                    return {status:"error", error:error}
                }
           }else{
               try{
                    if(product.nombre && product.descripcion && product.codigo && product.foto_url && product.precio && product.stock){
                        product.id=1;
                        await fs.promises.writeFile(pathToProducts,JSON.stringify([product],null,2))
                        return {status:"succes", payload:"Added first product"}
                    }else{
                        return {status:"error", payload:"Envia el siguiente body={nombre,descripción,codigo,foto(url),precio,stock o tienes campos vacios"}                   
                    }
                }catch(error){
                    return {status:"error", message:error}
                }
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
               return {status:"error", message:'Don\'t exist products'}
           }
       }  
       delete = async (id)=>{
           if(fs.existsSync(pathToProducts)){
               try{
                   let data = await fs.promises.readFile(pathToProducts,'utf-8')
                   let products = JSON.parse(data);
                   let secure =  products.some(product=>product.id===parseInt(id));
                   if(secure){
                        let newproducts= products.filter(product => product.id!==parseInt(id))
                        await fs.promises.writeFile(pathToProducts,JSON.stringify(newproducts,null,2))
                        return {status:"success", payload:'Deleted Product'};
                   }else{
                       return {status:"error", message:"The product never exist"}
                   }

               }catch(err) {
                   return {status:"error", message: error.message}
               }
           }else{
               return {status:"failes", message: 'try again later'}
           }
       }
       getById = async(id)=>{
           if(!id) return {status:"failes", message:"Needed an Id"}
           if(fs.existsSync(pathToProducts)){
               try{
                   let data = await fs.promises.readFile(pathToProducts,'utf-8')
                   let products = JSON.parse(data);
                   let secure =products.some(product =>product.id === id)
                   let product = products.filter(product =>product.id === parseInt(id))
                   if(secure){
                     return {status:'success', products:product}
                   }else{
                       return false;
                   }
               }catch(error) {
                   return{status:'denied', message: error}
               }
           }
       }
       UploadById = async (id,body) => {
           if(!id) return {status:'denied', message:'Needed an Id'}
           if(body.nombre && body.descripcion && body.codigo && body.foto_url && body.precio && body.stock){
               if(fs.existsSync(pathToProducts)){
                    try{
                        let data = await fs.promises.readFile(pathToProducts,'utf-8')
                        let products = JSON.parse(data);
                        let secure =  products.some(product=>product.id===parseInt(id));
                        if (secure){                    
                            let newproducts= products.map(product => {
                                if(product.id=== parseInt(id)){
                                   
                                    body.id=parseInt(id);
                                    return body;
                                }else{
                                    return product;
                                }
                            })
                            console.log(newproducts.length)
                            console.log(body)
                            await fs.promises.writeFile(pathToProducts,JSON.stringify(newproducts,null,2))
                            return {status:'success', message: 'Product Update'}
                    }else{
                        return {status:'error', message:"Don't exist this product"}
                    }
    
                    }catch(error){
                        return {status:'error', message: error.message}
                    }
               }
           }else{
                return {status:"error", payload:"Envia el siguiente body={nombre,descripción,codigo,foto(url),precio,stock o tienes campos vacios"}
           }
        }
}

module.exports=ProductsManager;