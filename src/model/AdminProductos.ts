import firebase from '../firebase/Firebase'
import Producto from './Producto'
import "firebase/auth"

interface Medida{
    id:number,
    talla:string,
    color:string,
    stock:number
}

class AdminProductos{

    private db:firebase.firestore.Firestore
    
    constructor(){
        this.db = firebase.firestore()
    }

    public async setProductData(producto: Producto):Promise<boolean>{
        var result: boolean = false
        try{
            await this.db.collection("productos")
            .doc(producto.id)
            .set(producto.getProductDataJson())
            await this.setPedidoProductData(producto)
            result = true
        }catch(err){
            console.error("error in method setProductData from AdminProductos: "+err);
        }
        return result
    }

    //producto de sección de temporada
    public async setProductTempData(producto: Producto):Promise<boolean>{
        var result: boolean = false
        try{
            await this.db.collection("temporada")
            .doc(producto.id)
            .set(producto.getProductDataJson())
            await this.setPedidoProductTempData(producto)
            result = true
        }catch(err){
            console.error("error in method setProductData from AdminProductos: "+err);
        }
        return result
    }

    getCurrentCommerce = () =>{
        return firebase.auth().currentUser
    }

    public async setPedidoProductData(producto: Producto):Promise<boolean>{
        var result: boolean = false
        try{
            await producto.getProductMedidasDataJson().map(async (medida,index)=>{
                medida["id"] = index
                await this.db.collection("medidas")
                .doc(producto.id+"_"+index)
                .set(medida)
            })
            result = true
        }catch(err){
            console.error("error in method setPedidoProductData from AdminProductos: "+err);
        }
        return result
    }

    public async setPedidoProductTempData(producto: Producto):Promise<boolean>{
        var result: boolean = false
        try{
            await producto.getProductMedidasDataJson().map(async (medida,index)=>{
                medida["id"] = index
                await this.db.collection("medidas")
                .doc(producto.id+"_temp_"+index)
                .set(medida)
            })
            result = true
        }catch(err){
            console.error("error in method setPedidoProductData from AdminProductos: "+err);
        }
        return result
    }

    async getDataProductos():Promise<Array<Producto>>{
        var productos: Array<Producto> = new Array<Producto>()
        try{
            var commercesResult = await this.db.collection("productos").get()
            commercesResult.forEach((producto) =>{
                let product:Producto = producto.data() as Producto
                product.id = producto.id
                productos.push(product)
            })
            for(const producto of productos){
                producto.medidas = await this.getDataMedidasFromProduct(producto)
            }
        }catch(err){
            console.error("error in method getDataProductos from AdminProductos: ",err);
        }
        return productos
    }

    async getDataProducto(id:string):Promise<Producto>{
        var producto:Producto = null
        try {
            var productoResult = await this.db.collection("productos").doc(id).get()
            if(productoResult.exists){
                producto = productoResult.data() as Producto
                producto.id = productoResult.id
            }else{
                console.error("No such document! (method:getDataProducto from AdminProductos)")
            }
        } catch (error) {
            console.error("error in method getDataProducto from AdminProductos: ",error);
        }
        return producto
    }

    async getDataProductosPag(init:string,finish:number):Promise<Array<Producto>>{
        var productos: Array<Producto> = new Array<Producto>()
        try{
            var commercesResult = await this.db.collection("productos")
            .orderBy("idTienda","asc")
            .startAfter(init)
            .limit(finish)
            .get()
            commercesResult.forEach((producto) =>{
                let product:Producto = producto.data() as Producto
                product.id = producto.id
                productos.push(product)
            })
            for(const producto of productos){
                producto.medidas = await this.getDataMedidasFromProduct(producto)
            }
        }catch(err){
            console.error("error in method getDataCommerces from AdminCommerces: ",err);
        }
        return productos
    }

    async getDataProductosTemporada():Promise<Array<Producto>>{
        var productos: Array<Producto> = new Array<Producto>()
        try{
            var commercesResult = await this.db.collection("temporada").get()
            commercesResult.forEach((producto) =>{
                let product:Producto = producto.data() as Producto
                product.id = producto.id
                productos.push(product)
            })
            for(const producto of productos){
                producto.medidas = await this.getDataMedidasFromProduct(producto)
            }
        }catch(err){
            console.error("error in method getDataCommerces from AdminCommerces: ",err);
        }
        return productos
    }

    async getDataProductosFromCommerce():Promise<Array<Producto>>{
        var productos: Array<Producto> = new Array<Producto>()
        try{
            var productsResult = await this.db.collection("productos")
            .where("idTienda","==",this.getCurrentCommerce().uid)
            .get()
            
            await productsResult.forEach((producto) =>{
                let product:Producto = producto.data() as Producto
                product.id = producto.id
                productos.push(product)
            })
            for(const producto of productos){
                producto.medidas = await this.getDataMedidasFromProduct(producto)
            }
        }catch(err){
            console.error("error in method getDataCommerces from AdminCommerces: ",err);
        }
        return productos
    }

    async getDataProductosTemporadaFromCommerce():Promise<Array<Producto>>{
        var productos: Array<Producto> = new Array<Producto>()
        try{
            var productsResult = await this.db.collection("temporada")
            .where("idTienda","==",this.getCurrentCommerce().uid)
            .get()
            
            await productsResult.forEach((producto) =>{
                let product:Producto = producto.data() as Producto
                product.id = producto.id
                productos.push(product)
            })
            for(const producto of productos){
                producto.medidas = await this.getDataMedidasFromProduct(producto)
            }
        }catch(err){
            console.error("error in method getDataCommerces from AdminCommerces: ",err);
        }
        return productos
    }

    async getDataProductosFromFilter(filter,value,init,finish):Promise<Array<Producto>>{
        var productos: Array<Producto> = new Array<Producto>()
        try{
            var productsResult = await this.db.collection("productos")
            .where(filter,"==",value)
            .orderBy("idTienda")
            .startAfter(init)
            .limit(finish)
            .get()
            await productsResult.forEach((producto) =>{
                let product:Producto = producto.data() as Producto
                product.id = producto.id
                productos.push(product)
            })
            for(const producto of productos){
                producto.medidas = await this.getDataMedidasFromProduct(producto)
            }
        }catch(err){
            console.error("error in method getDataProductosFromFilter from AdminCommerces: ",err);
        }
        return productos
    }

    async proof(filter,value,init,finish):Promise<String>{
        var productos: Array<Producto> = new Array<Producto>()
        try{
            var productsResult = await this.db.collection("productos")
            .where(filter,"==",value)
            .orderBy("idTienda")
            .startAfter(init)
            .limit(finish)
            .get()
            await productsResult.forEach((producto) =>{
                let product:Producto = producto.data() as Producto
                product.id = producto.id
                productos.push(product)
            })
            for(const producto of productos){
                producto.medidas = await this.getDataMedidasFromProduct(producto)
            }
        }catch(err){
            return err
        }
        return null
    }

    async updateProduct(producto:Producto):Promise<boolean>{
        var result: boolean = false
        producto = new Producto(producto)
        try{
            await this.db.collection("productos")
            .doc(producto.id)
            .update(producto.getProductDataJson())
            var medidas = await this.getDataMedidasFromProduct(producto)
            var medidasM = producto.getProductMedidasDataJson()
            //se comprobaran cuales se modificaran y se eliminaron
            for (let index = 0; index < medidas.length; index++) {
                let i = -1
                let index2 = 0
                for(const medidaM of medidasM){
                    if(medidas[index].id == medidaM["id"]){
                        i = index2
                        break
                    }
                    index2++
                }
                if(i >= 0){//existe
                    if(
                        !(medidas[index].color == medidasM[i]["color"]) ||
                        !(medidas[index].talla == medidasM[i]["talla"]) ||
                        !(medidas[index].stock == medidasM[i]["stock"])
                        ){//se modifico
                        await this.updateMedida(medidasM[i])
                    }
                }else{//fue eliminado
                    await this.db.collection("medidas").doc(producto.id+"_"+medidas[index].id).delete()
                }
            }
            //se comprobara cuales son nuevos
            for(let index = 0; index < medidasM.length; index++){
                let i = -1
                let index2 = 0
                for(const medida of medidas){
                    if(medidasM[index]["id"] == medida.id){
                        i = index2
                        break
                    }
                    index2++
                }
                if(i < 0){//es nuevo
                    await this.db.collection("medidas")
                    .doc(medidasM[index]["producto"]+"_"+medidasM[index]["id"])
                    .set(medidasM[index])
                }
            }
            result = true
        }catch (error) {
            console.error("error in method updateProduct from AdminCommerces: ",error);
        }
        return result
    }

    async updateProductTemporada(producto:Producto):Promise<boolean>{
        var result: boolean = false
        producto = new Producto(producto)
        try{
            await this.db.collection("temporada")
            .doc(producto.id)
            .update(producto.getProductDataJson())
            var medidas = await this.getDataMedidasFromProduct(producto)
            var medidasM = producto.getProductMedidasDataJson()
            //se comprobaran cuales se modificaran y se eliminaron
            for (let index = 0; index < medidas.length; index++) {
                let i = -1
                let index2 = 0
                for(const medidaM of medidasM){
                    if(medidas[index].id == medidaM["id"]){
                        i = index2
                        break
                    }
                    index2++
                }
                if(i >= 0){//existe
                    if(
                        !(medidas[index].color == medidasM[i]["color"]) ||
                        !(medidas[index].talla == medidasM[i]["talla"]) ||
                        !(medidas[index].stock == medidasM[i]["stock"])
                    ){//se modifico°
                        await this.updateMedidaTemporada(medidasM[i])
                    }
                }else{//fue eliminado
                    await this.db.collection("medidas").doc(producto.id+"_temp_"+medidas[index].id).delete()
                }
            }
            //se comprobara cuales son nuevos
            for(let index = 0; index < medidasM.length; index++){
                let i = -1
                let index2 = 0
                for(const medida of medidas){
                    if(medidasM[index]["id"] == medida.id){
                        i = index2
                        break
                    }
                    index2++
                }
                if(i < 0){//es nuevo
                    await this.db.collection("medidas")
                    .doc(medidasM[index]["producto"]+"_temp_"+medidasM[index]["id"])
                    .set(medidasM[index])
                }
            }
            result = true
        }catch (error) {
            console.error("error in method updateProductTemporada from AdminCommerces: ",error);
        }
        return result
    }

    async updateMedidaTemporada(medida:Object):Promise<boolean>{
        var result: boolean = false
        try {
            await this.db.collection("medidas")
            .doc(medida["producto"]+"_temp_"+medida["id"])
            .update(medida)
        } catch (error) {
            console.error("error in method updateMedida from AdminCommerces: ",error)
        }
        return result
    }

    async updateMedida(medida:Object):Promise<boolean>{
        var result: boolean = false
        try {
            await this.db.collection("medidas")
            .doc(medida["producto"]+"_"+medida["id"])
            .update(medida)
            result = true
        } catch (error) {
            console.error("error in method updateMedida from AdminCommerces: ",error)
        }
        return result
    }

    getNewArrayProducts():Array<Producto>{
        return new Array<Producto>()
    }

    async getDataMedidasFromProduct(producto:Producto):Promise<Array<Medida>>{
        var medidas: Array<Medida> = new Array<Medida>()
        try {
            var medidasResult = await this.db.collection("medidas")
            .where("producto","==",producto.id)
            .get()
            medidasResult.forEach((medida)=>{
                medidas.push({
                    id:medida.data().id,
                    talla:medida.data().talla,
                    color:medida.data().color,
                    stock:medida.data().stock
                })
            })
        } catch (error) {
            console.error(
                    "error in method getDataMedidasFromProduct from AdminCommerces, producto.id = "+
                    producto.id
                ,
                    error
            );
        }
        return medidas
    }

}
export default new AdminProductos()