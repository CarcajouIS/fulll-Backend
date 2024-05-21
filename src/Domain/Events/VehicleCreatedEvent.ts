import {Vehicle} from "../Model/index.js";

class VehicleCreatedEvent {
    constructor(private readonly _params: { vehicle: Vehicle }) {
    }

    get params() {
        return this._params;
    }

}

export {VehicleCreatedEvent};
