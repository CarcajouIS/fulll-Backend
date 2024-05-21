import {Fleet, Location} from "./index.js";
import * as R from "ramda";

export class Vehicle {
    plateNumber: string;
    currentLocation: Location = new Location();
    fleets!: Fleet[];

    constructor({plateNumber, fleets}: VehicleLike) {
        this.plateNumber = plateNumber;
        this.fleets = fleets ?? [];
    }

    get id() {
        return this.plateNumber;
    }

    async parkAt(location: Location): Promise<Vehicle> {
        if (!location) {
            throw new Error(`Cannot park at Null location`);
        }
        if (R.equals(this.currentLocation, location)) {
            console.error(`Unable to set current location: ${location.longitude} ${location.latitude} ${location.altitude}, already set`);
            throw new Error("Vehicle is already parked at this location");
        }
        this.currentLocation = location;
        return this;
    }
}

export type VehicleLike = { plateNumber: string, fleets?: Fleet[] }

