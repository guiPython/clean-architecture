import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreated from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        eventDispatcher.register(ProductCreated.name, eventHandler);
        expect(eventDispatcher.EventHandlers[ProductCreated.name]).toBeDefined();
        expect(eventDispatcher.EventHandlers[ProductCreated.name].length).toBe(1);
        expect(eventDispatcher.EventHandlers[ProductCreated.name][0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        eventDispatcher.register(ProductCreated.name, eventHandler);
        expect(eventDispatcher.EventHandlers[ProductCreated.name]).toBeDefined();
        expect(eventDispatcher.EventHandlers[ProductCreated.name].length).toBe(1);

        eventDispatcher.unregister(ProductCreated.name, eventHandler);
        expect(eventDispatcher.EventHandlers[ProductCreated.name]).toBeDefined();
        expect(eventDispatcher.EventHandlers[ProductCreated.name].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        eventDispatcher.register(ProductCreated.name, eventHandler);
        expect(eventDispatcher.EventHandlers[ProductCreated.name]).toBeDefined();
        expect(eventDispatcher.EventHandlers[ProductCreated.name].length).toBe(1);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.EventHandlers[ProductCreated.name]).toBeUndefined();
        expect(eventDispatcher.EventHandlers).toStrictEqual({});
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register(ProductCreated.name, eventHandler);
        
        const productCreatedEvent = new ProductCreated({
            name: "Some...",
            description: "Some description",
            price: 120.56
        })

        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toBeCalledTimes(1);
        expect(spyEventHandler).toBeCalledWith(productCreatedEvent);
    });
})