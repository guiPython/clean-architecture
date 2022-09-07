import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    private validate() {
        if (this._name.length === 0){
            throw new Error("Name is required")
        }
        if (this._id.length === 0){
            throw new Error("Id is required")
        }
    }

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate()
    }

    get Id(): string{
        return this._id;
    }

    get Name(): string{
        return this._name;
    }

    get Address(): Address{
        return this._address;
    }

    get RewardPoints(): number{
        return this._rewardPoints;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    addRewardPoints(points: number): void{
        if(points <= 0){
            throw new Error("Cannot add negative reward points")
        }
        this._rewardPoints += points;
    }

    activate() {
        if (this._address === undefined){
            throw new Error("Address is mandatory to active a customer")
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive(): boolean{
        return this._active;
    }
}