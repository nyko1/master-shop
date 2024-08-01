import { Product } from "src/resources/product/entities/product.entity"
import { CategoryVm } from "./category.vm"

export class ProductVm{
    id: number
    name: string
    price: number
    description: string
    category: CategoryVm

    constructor(data: Product){
        this.id = data.id
        this.name = data.name
        this.price = data.price
        this.description = data.description
        this.category = data.category
    }
}