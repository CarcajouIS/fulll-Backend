import {Location, Vehicle} from "../Model/index.js";

class VehicleParkedEvent {
    constructor(private readonly _params: { vehicle: Vehicle, location: Location }) {
    }

    get params() {
        return this._params;
    }
}

export {VehicleParkedEvent};
