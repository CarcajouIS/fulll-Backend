import {type VehicleCreatedEvent} from "../index.js";

export class VehicleCreatedEventHandler {
    handle({params: {vehicle: {id}}}: VehicleCreatedEvent): void {
        // Log the event
        console.debug(`Vehicle with plate number ${id} created`);
    }
}
