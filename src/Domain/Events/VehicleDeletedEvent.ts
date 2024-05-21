class VehicleDeletedEvent {
    constructor(private readonly _params: { id: string; }) {
    }

    get params() {
        return this._params;
    }
}

export {VehicleDeletedEvent};
