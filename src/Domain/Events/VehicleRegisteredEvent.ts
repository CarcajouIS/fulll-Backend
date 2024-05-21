import {Fleet, Vehicle} from "../Model/index.js";

class VehicleRegisteredEvent {
    constructor(private readonly _params: { fleet: Fleet, vehicle: Vehicle }) {
    }

    get params() {
        return this._params;
    }
}

export {VehicleRegisteredEvent};
