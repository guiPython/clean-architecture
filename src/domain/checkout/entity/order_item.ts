import Product from "../../product/entity/product";

export default class OrderItem{
    private _id: string;
    private _productId: string;
    private _name: string;
    private _quantity: number;
    private _price: number;

    private validate(){
        if(this._id.length == 0){
            throw new Error("Id is required");
        }
        if(this._productId.length == 0){
            throw new Error("Product id is required");
        }
        if(this._name.length == 0){
            throw new Error("Name is required");
        }
        if(this._quantity <= 0){
            throw new Error("Quantity must be greater than 0");
        }
        if(this._price <= 0){
            throw new Error("Price must be greater than 0");
        }
    }

    constructor(id: string, productId: string, name: string, price: number, quantity: number){
        this._id = id;
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this.validate();
    }

    get Id(): string{
        return this._id;
    }

    get ProductId(): string{
        return this._productId;
    }

    get Name(): string{
        return this._name;
    }

    get Quantity(): number{
        return this._quantity;
    }

    get Price(): number{
        return this._price;
    }

    increaseQuantity(product: Product): boolean{
        if(product.Id === this._productId){
            this._quantity += 1;
            return true;
        }
        return false;
    }

    total(): number{
        return this._price * this._quantity;
    }
}