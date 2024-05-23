import {AppDataSource} from "../../Infra/index.js";
import {Fleet} from "../../Domain/Model/index.js";

export class DeleteFleetCommand {
    constructor(private readonly params: { fleetId: string }) {
    }

    async execute() {
        await AppDataSource.getRepository(Fleet).delete(this.params.fleetId);
        return console.debug(`Deleted Fleet: ${this.params.fleetId}`);
    }

}
