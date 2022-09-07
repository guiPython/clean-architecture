import Product from "../entity/product";
import IProduct from "../entity/product.interface";
import {v4 as uuid} from "uuid"
import OtherProduct from "../entity/other";

export default class ProductFactory {
    public static create(type: string, name: string, price: number): IProduct {
        switch (type) {
            case "a":
                return new Product(uuid(), name, price);
            case "b":
                return new OtherProduct(uuid(), name, price);
            default:
                throw new Error(`Product type ${type} not supported`)
        }
    }
}