import {AppDataSource} from "../../Infra/index.js";
import {Vehicle} from "../../Domain/Model/index.js";

export class DeleteVehicleCommand {
    constructor(private readonly params: { plateNumber: string }) {
    }

    async execute() {
        await AppDataSource.getRepository(Vehicle).delete(this.params.plateNumber);
        return console.debug(`Deleted Vehicle: ${this.params.plateNumber}`);
    }

}
