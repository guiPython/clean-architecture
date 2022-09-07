import IProduct from "./product.interface";

export default class OtherProduct implements IProduct{
    private _id: string;
    private _name: string;
    private _price: number;

    private validate(){
        if(this._id.length === 0){
            throw new Error("Id is required")
        }
        if(this._name.length === 0){
            throw new Error("Name is required")
        }
        if(this._price <= 0){
            throw new Error("Price must be greater than 0")
        }
    }

    constructor(id: string, name: string, price: number){
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    get Id(): string{
        return this._id
    }

    get Name(): string{
        return this._name;
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    get Price(): number{
        return this._price * 2;
    }

    changePrice(price: number): void {
        this._price = price;
        this.validate();
    }
}