import {AppDataSource} from "../../Infra/index.js";
import {Fleet, type FleetLike} from "../../Domain/Model/index.js";

export class CreateFleetCommand {
    constructor(private readonly params: FleetLike) {
        this.params = {...this.params, vehicles: []};
    }

    async execute(): Promise<Fleet> {
        const obj: Fleet = AppDataSource.getRepository(Fleet).create(this.params);
        const fleet: Fleet = await AppDataSource.getRepository(Fleet).save(obj);
        console.debug(`Create fleet ${JSON.stringify(fleet)}`);
        return fleet;
    }
}
