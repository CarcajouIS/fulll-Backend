#!/usr/bin/env node

import {Command} from "commander";
import {FleetManagementServiceFactory} from "./App/index.js";
import {AppDataSource} from "./Infra/index.js";

try {
    await AppDataSource.initialize();
    console.debug("Data Source has been initialized");

    const service = await FleetManagementServiceFactory.create();
    const program = new Command();

    async function getFleet(fleetId: string) {
        let fleet = await service.getFleetById(fleetId);
        if (!fleet) {
            throw new Error(`Unable to register vehicle: ${fleetId}, fleet does not exist`);
        }
        return fleet;
    }

    async function getOrCreateVehicle(vehiclePlateNumber: string) {
        let vehicle = await service.getVehicleByPlateNumber(vehiclePlateNumber);
        if (!vehicle) {
            vehicle = await service.createVehicle(vehiclePlateNumber);
        }
        return vehicle;
    }

    program
        .command("create")
        .argument("<userId>", "The ID of the user who will be associated with the new fleet")
        .description("Create a new fleet")
        .action(async (userId) => {
            const fleet = await service.createFleet(userId);
            console.debug(`Fleet created with ID: ${fleet.id}`);
            process.stdout.write(fleet.id);
        });

    program
        .command("register-vehicle")
        .allowUnknownOption() // To let fleet ID with leading hyphen be parsed as an argument
        .argument("<fleetId>", "The ID of the fleet into which the vehicle will be registered", getFleet)
        .argument("<vehiclePlateNumber>", "The plate number of the vehicle to register", getOrCreateVehicle)
        .description("Register a vehicle to a fleet")
        .action(async (fleetPromise, vehiclePromise) => {
            const fleet = await fleetPromise;
            const vehicle = await vehiclePromise;
            await service.registerVehicle(fleet, vehicle);
            console.debug(`Vehicle ${vehicle.id} registered to fleet ${fleet.id}`);
        });

    program
        .command("localize-vehicle")
        .description("Localize a vehicle in a fleet")
        .allowUnknownOption() // To allow for negative coordinates, and let fleet ID with leading hyphen be parsed as an argument
        .argument("<fleetId>", "The ID of the fleet into which the vehicle will be registered", getFleet)
        .argument("<vehiclePlateNumber>", "The plate number of the vehicle to register", getOrCreateVehicle)
        .arguments(" <lat> <lng> [alt]")
        .action(async (fleetPromise, vehiclePromise, lat, lng, alt) => {
            const fleet = await fleetPromise;
            const vehicle = await vehiclePromise;
            await service.parkVehicle(vehicle, {latitude: lat, longitude: lng, altitude: alt});
            console.debug(`Vehicle ${vehicle} localized at (${lat}, ${lng}, ${alt})`);
        });

    program.parse(process.argv);
} catch (error) {
    console.error("Error initializing database", error);
}

