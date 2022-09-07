import IEventHandler from "../../../@shared/event/event-handler.interface";
import ProductCreated from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements IEventHandler<ProductCreated> {
    handle(event: ProductCreated): void{
        console.log("Sending email to .......");
    }
}