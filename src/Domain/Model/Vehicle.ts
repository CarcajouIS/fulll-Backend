import {Fleet, type Location} from "./index.js";
import {Column, Entity, ManyToMany, PrimaryColumn} from "typeorm";
import * as R from "ramda";

@Entity()
export class Vehicle {
    @PrimaryColumn("varchar")
    plateNumber: string;
    @Column("json", {nullable: true})
    currentLocation?: Location;
    @ManyToMany(() => Fleet, fleet => fleet.vehicles, {onDelete: "CASCADE", onUpdate: "CASCADE"})
    fleets!: Fleet[];

    constructor(plateNumber: string) {
        this.plateNumber = plateNumber;
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

