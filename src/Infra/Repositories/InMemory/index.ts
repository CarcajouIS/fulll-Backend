import {InMemoryRepository} from "./InMemoryRepository.js";
import {model} from "../../../Domain/index.js";

export const InMemoryFleetRepository = new InMemoryRepository<model.Fleet>(model.Fleet);
export const InMemoryVehicleRepository = new InMemoryRepository<model.Vehicle>(model.Vehicle);
