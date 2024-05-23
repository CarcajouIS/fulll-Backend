import {type VehicleDeletedEvent} from "../index.js";

export class VehicleDeletedEventHandler {
    handle(event: VehicleDeletedEvent): void {
        // Log the event
        console.debug(`Vehicle with plate number ${event.params.id} deleted`);
    }
}
