import {FleetRepository} from "../../Infra/Repositories/index.js";
import {Fleet, FleetLike} from "../../Domain/Model/index.js";

class CreateFleetCommand {
    constructor(private readonly params: FleetLike) {
        this.params = {...this.params, vehicles: []};
    }

    async execute(): Promise<Fleet> {
        const obj = FleetRepository.create(this.params);
        const fleet = await FleetRepository.save(obj);
        console.log(`Create fleet ${JSON.stringify(fleet)}`);
        return fleet;
    }
}

export {CreateFleetCommand};
