import {type FleetCreatedEvent} from "../index.js";

export class FleetCreatedEventHandler {
    handle({params: {fleet: {id, userId}}}: FleetCreatedEvent): void {
        // Log the event
        console.debug(`Fleet with id ${id} created by user ${userId}`);
    }
}
