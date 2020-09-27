import firebase from '../firebase/Firebase'
import Commerce from './Commerce'
import "firebase/auth"

class AdminCommerces{

    private db:firebase.firestore.Firestore
    private user:firebase.User
    private userRegister:firebase.User
    private error:{code:string,message:string}
    constructor(){
        this.db = firebase.firestore()
        this.user = null
        this.userRegister = null
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

    logout = async ():Promise<boolean>=>{
        try {
            await firebase.auth().signOut()
            return true
        } catch (error) {
            return false
        }
    }

    async registerCommerce(commerce: Commerce):Promise<boolean>{
        var result: boolean = false
        var uidCommerce = await this.setCommerceFirebase(commerce.email,"12345678")
        if(uidCommerce){
            commerce.uid = uidCommerce
            result = await this.setCommerce(commerce)
        }
        return result
    }
    

    private async setCommerceFirebase(email:string,password:string):Promise<string>{
        var result:string = null
        try{
            var createUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            result = createUser.user.uid
            this.userRegister = createUser.user
            await createUser.user.sendEmailVerification()
        }catch(error){
            console.error("error in method setCommerceFirebase from AdminCommerces "+error.code+": "+error.message);
        }
        return result
    }

    async setCommerce(commerce: Commerce):Promise<boolean>{
        var result: boolean = false
        try{
            await this.db.collection("commerces")
            .doc(commerce.uid)
            .set(new Commerce(commerce).getCommerceDataJson())
            result = true
        }catch(err){
            console.error("error in method setCommerce from AdminCommerces: "+err);
        }
        return result
    }

    async changePassword(pass:string,newPass:string):Promise<boolean>{
        var resultF:boolean = false
        if (this.user) {
            var result:boolean = await this.loginCommerce(this.user.email,pass)
            if(result){
                try{
                    await this.user.updatePassword(newPass)
                    resultF = true
                }catch(error){
                    console.error("error in method changePassword from AdminCommerces: "+error);
                }
            }
        } else {
            console.log("No user is signed in: ");
        }
        return resultF
    }

    async changeActiveCommerce():Promise<boolean>{
        var result:boolean = false
        if (this.user) {
            var commerce:Commerce = await this.getDataCommerce(this.user.uid)
            if(commerce != null){
                if(commerce.status){
                    commerce.status = false
                }else{
                    commerce.status = true
                }
                var resultU = await this.updateCommerceData(commerce)
                if(resultU){
                    result = true
                }
            }
        } else {
            console.log("No user is signed in: ");
        }
        return result
    }

    async loginCommerce(email:string,password:string):Promise<boolean>{
        var result:boolean = false
        try{
            var data:firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
            var commerce = await this.getDataCommerce(data.user.uid)
            if(commerce != null /*&& commerce.permissions && data.user.emailVerified*/){
                result = true
                this.user = firebase.auth().currentUser
            }
        }catch(err){
            if(err.code != "auth/wrong-password"){
                console.error("error "+err.code+": "+err.message)
            }
        }
        return result
    }

    getCurrentCommerce():firebase.User|null{
        if(this.user){
            return this.user
        }else{
            return firebase.auth().currentUser
        }
    }

    getCurrentCommerceRegister():string|null{
        if(this.userRegister){
            return this.userRegister.uid
        }else{
            return null
        }
    }

    async getDataCommerce(uid:string): Promise<Commerce>{
        var commerce: Commerce = null
        try{
            var doc = await this.db.collection("commerces").doc(uid).get()
            if (doc.exists) {
                commerce = doc.data() as Commerce
            } else {
                console.log("No such document!")
            }
        }catch(err){
            console.error("error in method getDataCommerce from AdminCommerces: ",err);   
        }
        return commerce
    }

    async getDataCommerces():Promise<Array<Commerce>>{
        var commerces: Array<Commerce> = new Array<Commerce>()
        try{
            var commercesResult = await this.db.collection("commerces").get()
            commercesResult.forEach((commerce) =>{
                commerces.push(commerce.data() as Commerce)
            })
        }catch(err){
            console.error("error in method getDataCommerces from AdminCommerces: ",err);
        }
        return commerces
    }

    async getDataCommercesWhereCategory(idCategory:string):Promise<Array<Commerce>>{
        var commerces: Array<Commerce> = new Array<Commerce>()
        try{
            var commercesResult = await this.db.collection("commerces")
            .where("category","==",idCategory)
            .get()
            commercesResult.forEach((commerce) =>{
                commerces.push(commerce.data() as Commerce)
            })
        }catch(err){
            console.error("error in method getDataCommerces from AdminCommerces: ",err);
        }
        return commerces
    }

    async getDataCommercesSearchName(name:string):Promise<Array<Commerce>>{
        var commerces: Array<Commerce> = new Array<Commerce>()
        return commerces
    }

    async getDataCategories():Promise<Array<Object>>{
        var categories: Array<Object> = new Array<Object>()
        try{
            var categoriesResult = await this.db.collection("categories").get()
            categoriesResult.forEach((category) =>{
                categories.push({id:category.id,name:category.data().name})
            })
        }catch(err){
            console.error("error in method getDataCommerces from AdminCommerces: ",err);
        }
        return categories
    }

    async enableCommerce(ruc:string):Promise<Commerce>{
        var commerceUpdate:Commerce = await this.getDataCommerce(ruc)
        commerceUpdate.status = true
        return commerceUpdate
    }

    async disableCommerce(ruc:string):Promise<Commerce>{
        var commerceUpdate:Commerce = await this.getDataCommerce(ruc)
        commerceUpdate.status = false
        return commerceUpdate
    }

    async updateCommerceEmail(email:string):Promise<boolean>{
        var result:boolean = false
        try {
            await firebase.auth().currentUser.updateEmail(email)
            result = true
        } catch (error) {
            this.error = error
            if(error.code != "auth/requires-recent-login"){
                console.error("error in method updateCommerceEmail from AdminCommerce: ",JSON.stringify(error))
            }
        }
        return result
    }

    async updateCommercePass(pass:string):Promise<boolean>{
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
                console.error("error in method updateCommerceEmail from AdminCommerce: ",JSON.stringify(error))
            }
        }
        return result
    }

    getError():{code:string,message:string}{
        return this.error
    }

    async updateCommerceData(commerceUpdate:Commerce):Promise<boolean>{
        var result:boolean = false
        var commerceObject = new Commerce(commerceUpdate).getCommerceDataJson();
        try{
            await this.db.collection("commerces").doc(this.getCurrentCommerce().uid)
            .update(commerceObject)
            result = true
        }catch(err){
            console.error("error in method updateCommerceData from AdminCommerce: "+err)
        }
        return result
    }

}

export default new AdminCommerces()