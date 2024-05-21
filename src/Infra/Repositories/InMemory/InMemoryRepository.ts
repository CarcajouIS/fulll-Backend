import {QueryRepository} from "./QueryRepository.js";
import {CommandRepository, Like} from "./CommandRepository.js";
import {GetFleetByIdQuery} from "../../../App/Queries/GetFleetByIdQuery.js";
import {GetVehicleByPlateNumberQuery} from "../../../App/Queries/GetVehicleByPlateNumberQuery.js";
import {GetVehicleLocationQuery} from "../../../App/Queries/GetVehicleLocationQuery.js";
import {FleetLike, VehicleLike} from "../../../Domain/Model/index.js";

class InMemoryRepository<T> implements QueryRepository<T, string>, CommandRepository<T> {
    private storage: Map<string, T> = new Map();

    constructor(private readonly _createClass: { new(paramObject: {}): T }) {
    }

    create(params: FleetLike | VehicleLike): T {
        return new this._createClass(params);
    }

    async save(entity: T): Promise<T> {
        const id = this.getId(entity);
        this.storage.set(id, entity);
        console.log(`Saved ${this.getEntityName()} with ID: ${id}`);
        return entity;
    }

    async update(criteria: string, entity: T): Promise<void> {
        if (!this.storage.has(criteria)) {
            throw new Error(`${this.getEntityName()} with id ${criteria} does not exist.`);
        }
        this.storage.set(criteria, entity);
        console.log(`Updated ${this.getEntityName()} with ID: ${criteria}`);
    }

    async find(id: string): Promise<T | undefined> {
        let ret = this.storage.get(id);
        if (!ret) {
            console.error(`${this.getEntityName()} with id ${id} does not exist.`);
        }
        return ret;
    }

    async delete(criteria: string): Promise<void> {
        if (!this.storage.delete(criteria)) {
            console.error(`${this.getEntityName()} with id ${criteria} does not exist`);
        }
    }

    public async findOneBy(criteria: GetFleetByIdQuery | GetVehicleByPlateNumberQuery | GetVehicleLocationQuery): Promise<T | null> {
        return await this.find(criteria.id) ?? null;
    }

    private getEntityName(): string {
        return this._createClass.name;
    }

    private createInstance<T>(constructor: new () => T): T {
        return new constructor();
    }

    private getId(entity: T | Like<T>): string {
        // Assumes the entity has an id property
        return (entity as any)?.id;
    }
}

export {InMemoryRepository};
