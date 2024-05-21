class GetVehicleLocationQuery {
    constructor(public plateNumber: string) {
    }

    get id() {
        return this.plateNumber;
    }
}

export {GetVehicleLocationQuery};
