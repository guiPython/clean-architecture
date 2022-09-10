import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "./address";

export default class Customer extends Entity{
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    private validate() {
        if (this.id.length === 0){
            this.notification.addError({
                context: "customer", 
                message: "Id is required"
            });
        }
        if (this._name.length === 0){
            this.notification.addError({
                context: "customer", 
                message: "Name is required"
            });
        } 
    }

    constructor(id: string, name: string){
        super();
        this.id = id;
        this._name = name;
        this.validate()

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.Errors);
        }
    }

    get Id(): string{
        return this.id;
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