import {model} from "../index.js";

type Vehicle = model.Vehicle

export class VehicleCreatedEvent {
    constructor(private readonly _params: { vehicle: Vehicle }) {
    }

    get params() {
        return this._params;
    }
}
