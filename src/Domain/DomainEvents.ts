type EventHandler<T> = (event: T) => void;

class DomainEvents {
    private static handlers: { [eventName: string]: EventHandler<any>[] } = {};

    static register<T>(eventName: string, handler: EventHandler<T>): void {
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(handler);
    }

    static publish<T>(event: T): void {
        // @ts-ignore because event has a constructor, do not worry
        const eventName = event.constructor.name;
        const handlers: EventHandler<T>[] = this.handlers[eventName] || [];
        for (const handler of handlers) {
            handler(event);
        }
    }
}

export {DomainEvents};
