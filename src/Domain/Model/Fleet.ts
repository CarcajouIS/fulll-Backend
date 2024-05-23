import {Vehicle} from "./index.js";
import {nanoid} from "nanoid";
import {Column, Entity, JoinTable, ManyToMany, PrimaryColumn} from "typeorm";

@Entity()
export class Fleet {
    @PrimaryColumn("varchar")
    fleetId!: string;
    @Column("varchar")
    userId!: string;
    @ManyToMany(() => Vehicle,
        vehicle => vehicle.fleets,
        {eager: true, cascade: true, onUpdate: "CASCADE", onDelete: "CASCADE"})
    @JoinTable({
        name: "fleet_vehicle",
        joinColumn: {name: "fleet", referencedColumnName: "fleetId"},
        inverseJoinColumn: {name: "vehicle", referencedColumnName: "plateNumber"},
    })
    vehicles!: Vehicle[];

    constructor(fleetId: string = nanoid(), userId: string) {
        this.fleetId = fleetId;
        this.userId = userId;
    }

    get id() {
        return this.fleetId;
    }

    async addVehicle(vehicle: Vehicle): Promise<Fleet> {
        if (!this.vehicles) {
            this.vehicles = [vehicle];
            return this;
        }
        if (!vehicle) {
            throw new Error(`Cannot add Null Vehicle to fleet ${this.fleetId}`);
        }
        if (this.hasVehicle(vehicle)) {
            throw new Error(`Vehicle ${vehicle.plateNumber} has not been added, already registered`);
        }
        this.vehicles.push(vehicle);
        return this;
    }

    hasVehicle(vehicle: Vehicle): boolean {
        return !!this.vehicles?.find((v) => v.plateNumber === vehicle?.plateNumber);
    }
}

export type FleetLike = { vehicles?: Vehicle[]; fleetId?: string; userId: string }
