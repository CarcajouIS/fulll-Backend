import {QueryRepository} from "./QueryRepository.js";
import {CommandRepository} from "./CommandRepository.js";
import {queries} from "../../../App/index.js";
import {model} from "../../../Domain/index.js";

type Query = queries.GetFleetByIdQuery | queries.GetVehicleByPlateNumberQuery | queries.GetVehicleLocationQuery;
type Like = model.VehicleLike | model.FleetLike;

export class InMemoryRepository<T> implements QueryRepository<T, string>, CommandRepository<T> {
    private storage: Map<string, T> = new Map();

    constructor(private readonly _createClass: { new(...params: any[]): T }) {
    }

    create(params: Like): T {
        return new this._createClass(Object.values(params));
    }

    async save(entity: T): Promise<T> {
        const id = this.getId(entity);
        this.storage.set(id, entity);
        console.debug(`Saved ${this.getEntityName()} with ID: ${id}`);
        return entity;
    }

    async update(criteria: string, entity: T): Promise<void> {
        if (!this.storage.has(criteria)) {
            throw new Error(`${this.getEntityName()} with id ${criteria} does not exist.`);
        }
        this.storage.set(criteria, entity);
        console.debug(`Updated ${this.getEntityName()} with ID: ${criteria}`);
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

    public async findOneBy(criteria: Query): Promise<T | null> {
        return await this.find(criteria.id) ?? null;
    }

    private getEntityName(): string {
        return this._createClass.name;
    }

    private createInstance<T>(constructor: new () => T): T {
        return new constructor();
    }

    private getId(entity: T | Like): string {
        // Assumes the entity has an id property
        return (entity as any)?.id;
    }
}
