import {Vehicle, VehicleLike} from "../../Domain/Model/index.js";
import {VehicleRepository} from "../../Infra/Repositories/index.js";

class CreateVehicleCommand {
    constructor(private readonly params: VehicleLike) {
        this.params = {...this.params, fleets: []};
    }

    async execute(): Promise<Vehicle> {
        const obj = VehicleRepository.create(this.params);
        const vehicle = await VehicleRepository.save(obj);
        console.log(`Create vehicle ${JSON.stringify(vehicle)}`);
        return vehicle;
    }
}

export {CreateVehicleCommand};
