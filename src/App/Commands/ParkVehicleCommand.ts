import {Location, Vehicle} from "../../Domain/Model/index.js";
import {VehicleRepository} from "../../Infra/Repositories/index.js";
import {queries} from "../index.js";

class ParkVehicleCommand {
    constructor(public params: { vehicle: Vehicle, location: Location }) {
    }

    async execute() {
        let {vehicle, location} = this.params;
        vehicle = await VehicleRepository.findOneBy(new queries.GetVehicleByPlateNumberQuery(vehicle.id)) as Vehicle;
        vehicle = await vehicle.parkAt(location);
        vehicle = await VehicleRepository.save(vehicle);
        console.log(`Parked vehicle ${vehicle.id} to location ${JSON.stringify(location)}`);
        return vehicle;
    }
}

export {ParkVehicleCommand};
