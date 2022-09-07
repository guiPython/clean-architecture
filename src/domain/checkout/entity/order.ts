import OrderItem from "./order_item";

import {v4 as uuid} from "uuid";
import Product from "../../product/entity/product";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[] = [];

    private validate(){
        if(this._id.length === 0){
            throw new Error("Id is required")
        }
        if(this._customerId.length === 0){
            throw new Error("Customer id is required")
        }
        if(this._items.length === 0){
            throw new Error("Items qtd must be greater than 0")
        }
    }

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }

    get Id(): string{
        return this._id;
    }

    get CustomerId(): string{
        return this._customerId;
    }

    get Items(): OrderItem[]{
        return this._items;
    }

    addProduct(product: Product): void{
        for(let item of this._items){
            if(item.ProductId == product.Id){
                if (item.increaseQuantity(product))
                    return;
            }
        }
        let item =  new OrderItem(uuid(),product.Id, product.Name, product.Price, 1);
        this._items.push(item);
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.total(), 0)
    }
}