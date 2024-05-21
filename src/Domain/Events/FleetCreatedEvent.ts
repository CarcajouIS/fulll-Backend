import {Fleet} from "../Model/index.js";

class FleetCreatedEvent {
    constructor(private readonly _params: { fleet: Fleet }) {
    }

    get params() {
        return this._params;
    }
}

export {FleetCreatedEvent};
