export class GetFleetByIdQuery {
    constructor(public fleetId: string) {
    }

    get id() {
        return this.fleetId;
    }
}
