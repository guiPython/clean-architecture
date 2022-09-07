import IEvent from "../../@shared/event/event.interface";


export default class ProductCreated implements IEvent {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any){
        this.eventData = eventData;
        this.dataTimeOccurred = new Date();
    }
}