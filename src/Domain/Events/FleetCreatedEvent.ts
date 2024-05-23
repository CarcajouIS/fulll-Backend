import {model} from "../index.js";

type Fleet = model.Fleet

export class FleetCreatedEvent {
    constructor(private readonly _params: { fleet: Fleet }) {
    }

    get params() {
        return this._params;
    }
}
