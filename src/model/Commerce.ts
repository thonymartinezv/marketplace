class  Commerce{
    uid:string
    ruc:string
    name:string
    urlPhoto:string
    dir_local:string
    phone_1:number
    code_phone_1:string
    email:string
    latitude:number
    longitude:number
    status:boolean
    permissions:boolean
    online:boolean
    legalEntity:boolean
    constructor(object?:any){
        if(object){
            this.uid = object.uid
            this.ruc = object.ruc
            this.name = object.name
            this.urlPhoto = object.urlPhoto
            this.dir_local = object.dir_local
            this.phone_1 = parseInt(object.phone_1)
            this.code_phone_1 = object.code_phone_1
            this.email = object.email
            this.legalEntity = object.legalEntity
            this.latitude = parseFloat(object.latitude)
            this.longitude = parseFloat(object.longitude)
            this.status = object.status
            this.permissions = object.permissions
            this.online = object.online
        }
    }

    getCommerceDataJson():Object{
        var json = {
            ruc:this.ruc,
            name:this.name,
            dir_local:this.dir_local,
            urlPhoto:this.urlPhoto,
            phone_1:this.phone_1?this.phone_1:"",
            code_phone_1:this.code_phone_1?this.code_phone_1:"",
            email:this.email,
            latitude:this.latitude?this.latitude:0,
            longitude:this.longitude?this.longitude:0,
            status:this.status?this.status:false,
            permissions:this.permissions?this.permissions:false,
            online:this.online?this.online:false,
            createAt:new Date()
        }
        return json
    }
}
export default Commerce