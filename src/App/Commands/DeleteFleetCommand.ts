import {FleetRepository} from "../../Infra/Repositories/index.js";

class DeleteFleetCommand {
    constructor(private readonly params: { fleetId: string }) {
    }

    async execute() {
        await FleetRepository.delete(this.params.fleetId);
        return console.log(`Deleted Fleet: ${this.params.fleetId}`);
    }

}

export {DeleteFleetCommand};
