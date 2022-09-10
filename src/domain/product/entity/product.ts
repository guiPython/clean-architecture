import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";
import IProduct from "./product.interface";

export default class Product extends Entity implements IProduct {
    private _name: string;
    private _price: number;

    private validate() {
        ProductValidatorFactory.create().validate(this);
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.Errors);
        }
    }

    constructor(id: string, name: string, price: number) {
        super();
        this.id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    get Id(): string {
        return this.id
    }

    get Name(): string {
        return this._name;
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    get Price(): number {
        return this._price;
    }

    changePrice(price: number): void {
        this._price = price;
        this.validate();
    }
}