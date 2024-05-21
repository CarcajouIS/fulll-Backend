import {Fleet, Vehicle} from "../../Domain/Model/index.js";
import {FleetRepository, VehicleRepository} from "../../Infra/Repositories/index.js";
import {queries} from "../index.js";

true;

class RegisterVehicleCommand {
    constructor(public params: { fleet: Fleet, vehicle: Vehicle }) {
    }

    async execute() {
        const vehicle = await VehicleRepository.findOneBy(new queries.GetVehicleByPlateNumberQuery(this.params.vehicle.id)) as Vehicle;
        let fleet = await FleetRepository.findOneBy(new queries.GetFleetByIdQuery(this.params.fleet.id)) as Fleet;
        await fleet.addVehicle(vehicle);
        fleet = await FleetRepository.save(fleet);
        console.log(`Registered vehicle ${this.params.vehicle.id} to fleet ${this.params.fleet.id}`);
        return fleet;
    }

}

export {RegisterVehicleCommand};
