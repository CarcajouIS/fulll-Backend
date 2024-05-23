import {type VehicleParkedEvent} from "../index.js";

export class VehicleParkedEventHandler {
    handle({params: {vehicle, location}}: VehicleParkedEvent): void {
        // Log the event
        console.debug(`Vehicle with plate number ${vehicle.id} parked at ${JSON.stringify(location)}`);
        // Update fleets
        for (let fleet of vehicle.fleets ?? []) {
            const index = fleet.vehicles.indexOf(vehicle);
            fleet.vehicles[index] = vehicle;
        }
    }
}
