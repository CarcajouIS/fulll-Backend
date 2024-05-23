import {type VehicleRegisteredEvent} from "../index.js";

export class VehicleRegisteredEventHandler {
    handle({params: {fleet, vehicle}}: VehicleRegisteredEvent): void {
        // Log the event
        console.debug(`Vehicle with plate number ${vehicle.id} registered to fleet ${fleet.id}`);
        // Update vehicle
        if (!vehicle.fleets) {
            vehicle.fleets = [];
        }
        vehicle.fleets.push(fleet);
    }
}
