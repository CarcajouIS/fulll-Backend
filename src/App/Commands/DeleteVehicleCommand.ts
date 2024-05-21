import {VehicleRepository} from "../../Infra/Repositories/index.js";

class DeleteVehicleCommand {
    constructor(private readonly params: { plateNumber: string }) {
    }

    async execute() {
        await VehicleRepository.delete(this.params.plateNumber);
        return console.log(`Deleted Vehicle: ${this.params.plateNumber}`);
    }

}

export {DeleteVehicleCommand};
