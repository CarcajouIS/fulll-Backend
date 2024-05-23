import {queries} from "../index.js";
import {Fleet, Vehicle} from "../../Domain/Model/index.js";
import {AppDataSource} from "../../Infra/index.js";

export class RegisterVehicleCommand {
    constructor(public params: { fleet: Fleet, vehicle: Vehicle }) {
    }

    async execute() {
        const vehicle = await AppDataSource.getRepository(Vehicle).findOneBy(new queries.GetVehicleByPlateNumberQuery(
            this.params.vehicle.id)) as Vehicle;
        let fleet = await AppDataSource.getRepository(Fleet).findOneBy(new queries.GetFleetByIdQuery(this.params.fleet.id)) as Fleet;
        await fleet.addVehicle(vehicle);
        fleet = await AppDataSource.getRepository(Fleet).save(fleet);
        console.debug(`Registered vehicle ${this.params.vehicle.id} to fleet ${this.params.fleet.id}`);
        return fleet;
    }

}
