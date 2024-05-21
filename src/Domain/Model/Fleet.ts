import {Vehicle} from "./index.js";
import {nanoid} from "nanoid";

export class Fleet {
    fleetId!: string;
    userId!: string;
    vehicles!: Vehicle[];

    constructor({fleetId, userId, vehicles}: FleetLike) {
        this.fleetId = fleetId ?? nanoid();
        this.userId = userId;
        this.vehicles = vehicles ?? [];
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

    getVehicle(plateNumber: string): Vehicle {
        const vehicle = this.vehicles.find((v) => v.plateNumber === plateNumber) as Vehicle;
        if (!vehicle) {
            throw new Error(`Vehicle with plate number ${plateNumber} not found`);
        }
        return vehicle;
    }

    equals(other: Fleet): boolean {
        return this.fleetId === other.fleetId;
    }
}

export type FleetLike = { vehicles?: Vehicle[]; fleetId?: string; userId: string }
