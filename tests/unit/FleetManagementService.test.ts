import {AppDataSource} from "../../src/Infra";
import {FleetManagementService, FleetManagementServiceFactory} from "../../src/App";
import {afterAll, afterEach, beforeAll, describe, expect, test} from "@jest/globals";

let service: FleetManagementService;

beforeAll(async () => {
    await AppDataSource.initialize();
    console.debug("Data Source has been initialized");
    service = await FleetManagementServiceFactory.create();
});

afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
    console.debug("Database cleared");
});

describe("FleetManagementService", () => {
    afterEach(async () => {
        //Cleanup
        await AppDataSource.createQueryBuilder().delete().from("Fleet").execute();
        console.debug("Table Fleet cleared");
        await AppDataSource.createQueryBuilder().delete().from("Vehicle").execute();
        console.debug("Table Vehicle cleared");
    });

    test("should create a new fleet", async () => {
        const userId = "user1";
        const fleet = await service.createFleet(userId);

        const fl = await service.getFleetById(fleet.id);
        expect(fl).toBeDefined();
        expect(fl?.userId).toBe(userId);
    });

    test("should register a vehicle to a fleet", async () => {
        const userId = "user1";
        const fleet = await service.createFleet(userId);
        const vehiclePlateNumber = "ABC1234DEF";
        const vehicle = await service.createVehicle(vehiclePlateNumber);

        await service.registerVehicle(fleet, vehicle);

        const fl = await service.getFleetById(fleet.id);
        expect(fl).toBeDefined();
        expect(fl?.vehicles).toHaveLength(1);
        expect(fl?.vehicles[0].id).toBe(vehicle.id);
    });

    test("should park a vehicle", async () => {
        const userId = "user1";
        const fleet = await service.createFleet(userId);
        const vehiclePlateNumber = "ABC1234DEF";

        const vehicle = await service.createVehicle(vehiclePlateNumber);
        await service.registerVehicle(fleet, vehicle);
        const location = {latitude: 40.7128, longitude: -74.006, altitude: 0};
        await service.parkVehicle(vehicle, location);

        const veh = await service.getVehicleByPlateNumber(vehiclePlateNumber);
        expect(veh).toBeDefined();
        expect(veh?.currentLocation).toEqual(location);
        const loc = await service.getVehicleLocation(vehiclePlateNumber);
        expect(loc).toEqual(location);

    });
});
