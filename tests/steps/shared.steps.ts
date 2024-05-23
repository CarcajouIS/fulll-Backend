import {FleetManagementService, FleetManagementServiceFactory} from "../../src/App/index.js";
import {After, AfterAll, Before, BeforeAll, Given} from "@cucumber/cucumber";
import {AppDataSource} from "../../src/Infra/index.js";

let fleetManagementService: FleetManagementService;
const testUsers = ["user1", "user2"];
const testVehicles = ["ABC1234DEF"];
const testLocations = [{latitude: 40.7128, longitude: -74.0060, altitude: 0}];

BeforeAll(async function () {
    await AppDataSource.initialize();
    console.debug("Data Source has been initialized");
    fleetManagementService = await FleetManagementServiceFactory.create();
    console.debug("FleetManagementService created");
});

Before(async function () {
    this.fleetManagementService = fleetManagementService;
    this.testUsers = testUsers;
    this.testFleets = [];
    this.testVehicles = testVehicles;
    this.testLocations = testLocations;
});

After(async function () {
    //Cleanup
    await AppDataSource.createQueryBuilder().delete().from("Fleet").execute();
    console.debug("Table Fleet cleared");
    await AppDataSource.createQueryBuilder().delete().from("Vehicle").execute();
    console.debug("Table Vehicle cleared");
});

AfterAll(async function () {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
    console.debug("Database cleared");
});

Given("my fleet", async function () {
    this.fleet = await this.fleetManagementService.createFleet(this.testUsers[0]);
    this.testFleets.push(this.fleet.id);
});

Given("a vehicle", async function () {
    this.vehicle = await this.fleetManagementService.createVehicle(this.testVehicles[0]);
});

Given("I have registered this vehicle into my fleet", async function () {
    this.fleet = await this.fleetManagementService.registerVehicle(this.fleet, this.vehicle);
});
