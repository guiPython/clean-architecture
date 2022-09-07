import IEventHandler from "../../../@shared/event/event-handler.interface";
import { CustomerCreated } from "../customer-created.event";

export default class SendConsoleLog1WhenCustomerCreated implements IEventHandler<CustomerCreated>{
    handle(_: CustomerCreated): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}