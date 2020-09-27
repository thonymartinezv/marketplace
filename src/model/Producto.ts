import Medida from './Medida'

export default class Producto{
    id:string
    numP:number
    idTienda:string
    imagen1:string
    imagenUri1:string
    imagen2:string
    imagenUri2:string
    imagen3:string
    imagenUri3:string
    imagen4:string
    imagenUri4:string
    rubro:number
    category:number
    subCategory:number
    name:string
    detail:string
    descrip:string
    imageActive:number
    categories:any[]
    subCategories:any[]
    medidas:Array<Medida>
    price:number
    medidaActive:number
    imageChange1:boolean
    imageChange2:boolean
    imageChange3:boolean
    imageChange4:boolean
    constructor(object?:any){
        if(object){
            this.id = object.id
            this.idTienda = object.idTienda
            this.numP = object.numP
            this.imagen1 = object.imagen1
            this.imagen2 = object.imagen2
            this.imagen3 = object.imagen3
            this.imagen4 = object.imagen4
            this.rubro = object.rubro
            this.category = object.category
            this.subCategory = object.subCategory
            this.name = object.name
            this.detail = object.detail
            this.descrip = object.descrip
            this.medidas = object.medidas
            this.price = object.price
        }else{
            this.medidas = new Array<Medida>()
            this.price = 0
            this.medidas.push({
                id:0,
                talla:'',
                color:'',
                stock:0
            })
        }
        this.imageActive = 0
        this.medidaActive = 0
        this.categories = new Array()
        this.subCategories = new Array()
        this.imageChange1 = false
        this.imageChange2 = false
        this.imageChange3 = false
        this.imageChange4 = false
    }

    getProductMedidasDataJson():Array<Object>{
        var medidas = new Array<Object>()
        this.medidas.forEach((medida)=>{
            medidas.push({
                producto:this.id,
                numP:this.numP,
                id:medida.id?medida.id:null,
                talla:medida.talla?medida.talla:"",
                color:medida.color,
                stock:medida.stock
            })
        })
        return medidas
    }


    getProductDataJson():Object{
        var json = {
            idTienda:this.idTienda,
            numP:this.numP,
            imagen1:this.imagen1,
            imagen2:this.imagen2?this.imagen2:"",
            imagen3:this.imagen3?this.imagen3:"",
            imagen4:this.imagen4?this.imagen4:"",
            rubro:this.rubro,
            category:this.category?this.category:"",
            subCategory:this.subCategory?this.subCategory:"",
            name:this.name,
            detail:this.detail,
            descrip:this.descrip,
            price:this.price,
            createAt:new Date()
        }
        return json
    }
}