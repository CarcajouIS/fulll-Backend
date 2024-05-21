import {VehicleCreatedEvent} from "../VehicleCreatedEvent.js";

class VehicleCreatedEventHandler {
    handle({params: {vehicle: {id}}}: VehicleCreatedEvent): void {
        // Log the event
        console.log(`Vehicle with plate number ${id} created`);
    }
}

export {VehicleCreatedEventHandler};
