import "reflect-metadata";
import {DataSource} from "typeorm";
import {Fleet, Vehicle} from "../Domain/Model/index.js";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DATABASE_URL || "fleetmanagement.sqlite",
    synchronize: true,
    logging: ["warn", "error"],
    entities: [Fleet, Vehicle],
    migrations: [],
    subscribers: [],
});
