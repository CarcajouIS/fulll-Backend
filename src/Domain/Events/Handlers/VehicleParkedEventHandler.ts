import {VehicleParkedEvent} from "../VehicleParkedEvent.js";
import {FleetRepository} from "../../../Infra/Repositories/index.js";

class VehicleParkedEventHandler {
    handle({params: {vehicle, location}}: VehicleParkedEvent): void {
        // Log the event
        console.log(`Vehicle with plate number ${vehicle.id} parked at ${JSON.stringify(location)}`);
        // Update fleets
        for (let fleet of vehicle.fleets) {
            const index = fleet.vehicles.indexOf(vehicle);
            fleet.vehicles[index] = vehicle;
            FleetRepository.update(fleet.id, fleet).then(() => console.log(`Fleet ${fleet.id} updated`));
        }
    }
}

export {VehicleParkedEventHandler};
