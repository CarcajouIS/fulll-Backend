import {VehicleRegisteredEvent} from "../VehicleRegisteredEvent.js";
import {VehicleRepository} from "../../../Infra/Repositories/index.js";

class VehicleRegisteredEventHandler {
    handle({params: {fleet, vehicle}}: VehicleRegisteredEvent): void {
        // Log the event
        console.log(`Vehicle with plate number ${vehicle.id} registered to fleet ${fleet.id}`);
        // Update vehicle
        vehicle.fleets.push(fleet);
        VehicleRepository.update(vehicle.id, vehicle).then(() => console.log(`Vehicle ${vehicle.id} updated`));
    }
}

export {VehicleRegisteredEventHandler};
