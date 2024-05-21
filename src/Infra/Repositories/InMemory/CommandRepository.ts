export type Like<T> = { id: string }

export interface CommandRepository<T> {
    create(params: FleetLike | VehicleLike): T;

    save(entity: T): Promise<T>;

    update(criteria: string, entity: T): Promise<void>;

    delete(criteria: string): Promise<void>;
}
