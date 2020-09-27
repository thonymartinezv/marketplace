import firebase from '../firebase/Firebase'
import User from './User'
import "firebase/auth"
import Medida from './Medida'
import {ProductoPedido, Pedido} from './Pedido'

class AdminUsers{

    private db:firebase.firestore.Firestore
    private error:{code:string,message:string}
    constructor(){
        this.db = firebase.firestore()
    }

    public async setPedidoData(pedido: Pedido):Promise<boolean>{
        var result: boolean = false
        try{
            await this.db.collection("pedidos")
            .doc(new Date().getTime().toString())
            .set(pedido.getPedidoDataJson())
            result = true
        }catch(err){
            console.error("error in method setPedidoData from AdminUsers: "+err)
        }
        return result
    }
    
    async updatePedidoData(pedido: Pedido):Promise<boolean>{
        var result: boolean = false
        try {
            await this.db.collection("pedidos")
            .doc(pedido.id)
            .update((new Pedido(pedido)).getPedidoDataJson())
            result = true
        } catch (error) {
            console.error("error in method updatePedidoData from AdminUsers: ",error)
        }
        return result
    }
    
    async getPedido():Promise<Pedido>{
        var result:Pedido = null
        try{
            let pedidos = await this.db.collection("pedidos")
            .where("idClient","==",this.getCurrentUser().uid)
            .get()
            let succes = false
            pedidos.forEach((pedido)=>{
                if (!succes && pedido.data().state == 0) {//0 = en proceso,-1 Rechazado,1 aprobado
                    result = new Pedido(pedido.data() as Pedido)
                    result.id = pedido.id
                    succes = true
                }
            })
        }catch(e){
            console.error("error in method getPedido from AdminUsers: ",e)
        }
        return result
    }
    
    getCurrentUser = () =>{
        return firebase.auth().currentUser
    }

    checkedEmail = async (email:string):Promise<boolean> =>{
        try {
            var result = await firebase.auth().fetchSignInMethodsForEmail(email)
            if(result.length > 0){
                return true
            }
        }catch(e){
            console.error("error: "+JSON.stringify(e))
        }
        return false
    }

    async loginUser(email:string,password:string):Promise<firebase.User>{
        var result:firebase.User = null
        try{
            var res = await firebase.auth().signInWithEmailAndPassword(email, password)
            result = res.user
        }catch(err){
            console.log("error "+err.code+": "+err.message)
        }
        return result
    }

    public async setUserData(user: User):Promise<boolean>{
        var result: boolean = false
        try{
            await this.db.collection("clients")
            .doc(this.getCurrentUser().uid)
            .set(user.getUserDataJson())
            result = true
        }catch(err){
            console.error("error in method setUser from AdminUsers: "+err);
        }
        return result
    }

    async updateUserEmail(email:string):Promise<boolean>{
        var result:boolean = false
        try {
            await firebase.auth().currentUser.updateEmail(email)
            result = true
        } catch (error) {
            console.error("error in method updateUserEmail from AdminUsers: ",error)
        }
        return result
    }
    
    async updateUserData(user: User):Promise<boolean>{
        var result: boolean = false
        try {
            await this.db.collection("clients")
            .doc(user.id)
            .update((new User(user)).getUserDataJson())
            result = true
        } catch (error) {
            console.error("error in method updateUserData from AdminUsers: ",error)
        }
        return result
    }

    async updateUserPass(pass:string):Promise<boolean>{
        var result:boolean = false
        try {
            await firebase.auth().currentUser.updatePassword(pass)
            result = true
        } catch (error) {
            this.error = error
            if(
                error.code != "auth/requires-recent-login" &&
                error.code != "auth/weak-password"
            ){
                console.error("error in method updateUserPass from AdminUsers: ",JSON.stringify(error))
            }
        }
        return result
    }

    getError():{code:string,message:string}{
        return this.error
    }

    public async setUserFirebase(email:string,password:string):Promise<string>{
        var result:string = ""
        try{
            var createUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            result = createUser.user.uid
        }catch(error){
            console.error("error "+error.code+": "+error.message);
        }
        return result
    }

    async getDataUser(id:string): Promise<User>{
        var user: User = null
        try{
            var doc = await this.db.collection("clients").doc(id).get()
            if (doc.exists) {
                user = doc.data() as User
                user.id = doc.id
            } else {
                console.error("No such document! (method:getDataUser)")
            }
        }catch(err){
            console.error("error in method getUser from CrudUsers: ",err);   
        }
        return user
    }

    async getDataPedidosFromUser():Promise<Array<Pedido>>{
        var pedidos: Array<Pedido> = new Array<Pedido>()
        try{
            var pedidosResult = await this.db.collection("pedidos")
            .where("idClient","==",this.getCurrentUser().uid)
            .get()
            pedidosResult.forEach((pedido) =>{
                let pedidoT:Pedido = pedido.data() as Pedido
                pedidoT.id = pedido.id
                pedidoT.listProducts.map((product)=>{
                    product.createAt = new Date(product.createAt["seconds"]*1000)
                })
                pedidos.push(pedidoT)
            })
        }catch(err){
            console.error("error in method getDataPedidosFromUser from AdminUsers: ",err);
        }
        return pedidos
    }
    async getDataPedidosSucces():Promise<Array<Pedido>>{
        var pedidos: Array<Pedido> = new Array<Pedido>()
        try{
            var pedidosResult = await this.db.collection("pedidos")
            .where("idClient","==",this.getCurrentUser().uid)
            .where("state","==",1)
            .get()
            pedidosResult.forEach((pedido) =>{
                let pedidoT:Pedido = pedido.data() as Pedido
                pedidoT.id = pedido.id
                
                pedidoT.listProducts.map((product)=>{
                    product.createAt = new Date(product.createAt["seconds"]*1000)
                })
                pedidos.push(pedidoT)
            })
            console.log(pedidos)
        }catch(err){
            console.error("error in method getDataPedidosFromUser from AdminUsers: ",err);
        }
        return pedidos
    }
}

export default new AdminUsers()