import {model} from "../index.js";

type Fleet = model.Fleet
type Vehicle = model.Vehicle

export class VehicleRegisteredEvent {
    constructor(private readonly _params: { fleet: Fleet, vehicle: Vehicle }) {
    }

    get params() {
        return this._params;
    }
}
