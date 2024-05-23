import {Vehicle, type VehicleLike} from "../../Domain/Model/index.js";
import {AppDataSource} from "../../Infra/index.js";


export class CreateVehicleCommand {
    constructor(private readonly params: VehicleLike) {
        this.params = {...this.params, fleets: []};
    }

    async execute(): Promise<Vehicle> {
        const obj: Vehicle = AppDataSource.getRepository(Vehicle).create(this.params);
        const vehicle: Vehicle = await AppDataSource.getRepository(Vehicle).save(obj);
        console.debug(`Create vehicle ${JSON.stringify(vehicle)}`);
        return vehicle;
    }
}
