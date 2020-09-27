import Medida from './Medida'
export interface ProductoPedido{
    id:string
    name:string
    medidas:Array<Medida>
    idTIenda:string,
    price:number,
    createAt:Date,
    imagen1:string
}

export class Pedido {
    id:string
    idClient:string
    photoPay:string
    listProducts:Array<ProductoPedido>
    state:number
    stateShipping:boolean
    constructor(pedido?:{
        id:string,
        idClient:string,
        photoPay:string,
        listProducts:Array<ProductoPedido>,
        state:number,
        stateShipping:boolean
    }){
        if(pedido){
            this.id = pedido.id
            this.idClient = pedido.idClient
            this.photoPay = pedido.photoPay
            this.listProducts = pedido.listProducts
            this.state = pedido.state
            this.stateShipping = pedido.stateShipping
        }
    }
    getPedidoDataJson():Object{
        return {
            idClient:this.idClient,
            photoPay:this.photoPay?this.photoPay:null,
            listProducts:this.listProducts,
            state:this.state,
            stateShipping:this.stateShipping
        }
    }
}

export class GetInstances {
    
    static NewArrayProductP():Array<ProductoPedido>{
        return new Array<ProductoPedido>()
    }

    static NewArrayMed():Array<Medida>{
        return new Array<Medida>()
    }
    static newProductPedido():ProductoPedido{
        let productPedido:ProductoPedido = {
            id:null,
            name:null,
            medidas:new Array<Medida>(),
            idTIenda:null,
            createAt:null,
            price:0,
            imagen1:null
        }
        return productPedido
    }
    static newMedida():Medida{
        let medida:Medida = {
            id:null,
            talla:null,
            color:null,
            stock:null
        }
        return medida
    }
}
