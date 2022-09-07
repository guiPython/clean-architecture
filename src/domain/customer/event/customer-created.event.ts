import IEvent from "../../@shared/event/event.interface";

export interface ICustomerCreatedData {}

export class CustomerCreated implements IEvent{
    dataTimeOccurred: Date;
    eventData: ICustomerCreatedData;

    constructor(eventData: ICustomerCreatedData){
        this.eventData = eventData;
        this.dataTimeOccurred = new Date();
    }
}