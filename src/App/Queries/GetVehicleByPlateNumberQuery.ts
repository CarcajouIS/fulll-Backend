class GetVehicleByPlateNumberQuery {
    constructor(public plateNumber: string) {
    }

    get id() {
        return this.plateNumber;
    }
}

export {GetVehicleByPlateNumberQuery};
