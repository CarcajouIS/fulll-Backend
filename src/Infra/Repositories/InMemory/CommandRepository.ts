import {model} from "../../../Domain/index.js";

type Like = model.VehicleLike | model.FleetLike;

export interface CommandRepository<T> {
    create(params: Like): T;

    save(entity: T): Promise<T>;

    update(criteria: string, entity: T): Promise<void>;

    delete(criteria: string): Promise<void>;
}
