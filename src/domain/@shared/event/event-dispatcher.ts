import IEventDispatcher from "./event-dispatcher.interface";
import IEventHandler from "./event-handler.interface";
import IEvent from "./event.interface";

export default class EventDispatcher implements IEventDispatcher{
    private handlers: Record<string, IEventHandler[]> = {};

    notify(event: IEvent): void{
        const eventName = event.constructor.name;
        if(this.handlers[eventName]){
            this.handlers[eventName].forEach(e => e.handle(event));
        }
    }

    register(eventName: string, eventHandler: IEventHandler): void{
        if(!this.handlers[eventName]){
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: IEventHandler): void{
        if(this.handlers[eventName]){
            const indexOfHandler = this.handlers[eventName].indexOf(eventHandler);
            if(indexOfHandler !== -1) this.handlers[eventName].splice(indexOfHandler, 1);
        }
    }

    unregisterAll(): void{
        this.handlers = {}
    }

    get EventHandlers(): Record<string, IEventHandler<IEvent>[]> {
        return this.handlers;
    }
}