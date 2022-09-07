import EventDispatcher from "../../../@shared/event/event-dispatcher";
import Address from "../../../customer/entity/address";
import { CustomerAddressChanged } from "../../../customer/event/customer-address-changed.event";
import { CustomerCreated } from "../customer-created.event";
import SendConsoleLogWhenCustomerAddressChanged from "./send-consoleLog-when-customer-address-is-changed";
import SendConsoleLog1WhenCustomerCreated from "./send-consoleLog1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerCreated from "./send-consoleLog2-when-customer-is-created.handler";

describe("Customer event handlers tests", () => {
    let eventDispatcher = new EventDispatcher();
    beforeAll(() => {
        eventDispatcher.unregisterAll();
    })

    it("should write in console when customer is created", () => {
        const customerCreated = new CustomerCreated({});
        const handler1 = new SendConsoleLog1WhenCustomerCreated();
        const spyHandler1 = jest.spyOn(handler1, "handle");

        eventDispatcher.register(CustomerCreated.name, handler1);
        eventDispatcher.notify(customerCreated);
        expect(spyHandler1).toBeCalledTimes(1);
        expect(spyHandler1).toHaveBeenCalledWith(customerCreated);
        
        const handler2 = new SendConsoleLog2WhenCustomerCreated();
        const spyHandler2 = jest.spyOn(handler2, "handle");

        eventDispatcher.register(CustomerCreated.name, handler2);
        eventDispatcher.notify(customerCreated);

        expect(spyHandler1).toBeCalledTimes(2);
        expect(spyHandler1).toHaveBeenCalledWith(customerCreated);
        expect(spyHandler2).toBeCalledTimes(1);
        expect(spyHandler2).toHaveBeenCalledWith(customerCreated);
    })

    it("should write in console when customer address is changed", () => {
        const customerAddressIsChanged = new CustomerAddressChanged({
            id: "1",
            name: "Some...",
            address: new Address("Rua 7", 458, "123-456", "São Paulo")
        });

        const handler = new SendConsoleLogWhenCustomerAddressChanged();
        const spyHandler = jest.spyOn(handler, "handle");

        eventDispatcher.register(CustomerAddressChanged.name, handler);
        eventDispatcher.notify(customerAddressIsChanged);
        expect(spyHandler).toBeCalledTimes(1);
        expect(spyHandler).toHaveBeenCalledWith(customerAddressIsChanged);
    })
})