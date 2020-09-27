class  User{
    id:string
    dni:string
    name:string
    surname:string
    profile:string
    dir:string
    phone:number
    code_phone:string
    email:string
    password:string
    permissions:number
    status:boolean
    ubigeo:number

    constructor (user?:{id,
        dni,
        name,
        surname,
        profile,
        dir,
        phone,
        code_phone,
        email,
        password,
        permissions,
        status,
        ubigeo}){
            if(user){
                this.id = user.id
                this.dni = user.dni
                this.name = user.name
                this.surname = user.surname
                this.profile = user.profile
                this.dir = user.dir
                this.phone = user.phone
                this.code_phone = user.code_phone
                this.email = user.email
                this.password = user.password
                this.permissions = user.permissions
                this.status = user.status
                this.ubigeo = user.ubigeo
            }
    }

    getUserDataJson():Object{
        var json = {
            name: this.name,
            dni: this.dni,
            email: this.email,
            profile: this.profile,
            dir: this.dir,
            phone: this.phone,
            code_phone:this.code_phone,
            permissions: this.permissions?this.permissions:false,
            status: this.status?this.status:false,
            ubigeo: this.ubigeo?this.ubigeo:''
        }
        return json
    }

}

export default User