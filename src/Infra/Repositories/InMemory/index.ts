import {InMemoryRepository} from "./InMemoryRepository.js";
import {Fleet, Vehicle} from "../../../Domain/Model/index.js";

export const InMemoryFleetRepository = new InMemoryRepository<Fleet>(Fleet);
export const InMemoryVehicleRepository = new InMemoryRepository<Vehicle>(Vehicle);