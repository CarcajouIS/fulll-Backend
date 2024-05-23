import {model} from "../index.js";

type Vehicle = model.Vehicle
type Location = model.Location

export class VehicleParkedEvent {
    constructor(private readonly _params: { vehicle: Vehicle, location: Location }) {
    }

    get params() {
        return this._params;
    }
}
