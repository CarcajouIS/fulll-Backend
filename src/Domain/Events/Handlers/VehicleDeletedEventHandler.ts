import {VehicleDeletedEvent} from "../VehicleDeletedEvent.js";

class VehicleDeletedEventHandler {
    handle(event: VehicleDeletedEvent): void {
        // Log the event
        console.log(`Vehicle with plate number ${event.params.id} deleted`);
    }
}

export {VehicleDeletedEventHandler};