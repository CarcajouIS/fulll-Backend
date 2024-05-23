import {type Location, Vehicle} from "../../Domain/Model/index.js";
import {queries} from "../index.js";
import {AppDataSource} from "../../Infra/index.js";

export class ParkVehicleCommand {
    constructor(public params: { vehicle: Vehicle, location: Location }) {
    }

    async execute() {
        let {vehicle, location} = this.params;
        vehicle = await AppDataSource.getRepository(Vehicle).findOneBy(new queries.GetVehicleByPlateNumberQuery(
            vehicle.id)) as Vehicle;
        vehicle = await vehicle.parkAt(location);
        vehicle = await AppDataSource.getRepository(Vehicle).save(vehicle);
        console.debug(`Parked vehicle ${vehicle.id} to location ${JSON.stringify(location)}`);
        return vehicle;
    }
}
