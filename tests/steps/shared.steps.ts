import {After, AfterAll, Before, BeforeAll, Given} from "@cucumber/cucumber";
import {FleetManagementService, FleetManagementServiceFactory} from "../../src/App/index.js";

let fleetManagementService: FleetManagementService;
const testUsers = ["user1", "user2"];
const testVehicles = ["ABC1234DEF"];
const testLocations = [{latitude: 40.7128, longitude: -74.0060, altitude: 0}];

BeforeAll(async function () {
    fleetManagementService = FleetManagementServiceFactory.create();
    console.log("FleetManagementService created");
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
    console.log("deleting test objects");
    console.log("deleting test fleets");
    for (const fleetId of this.testFleets) {
        console.log(`deleting test fleet ${fleetId}`);
        await this.fleetManagementService.deleteFleet(fleetId);
    }
    console.log("deleting test vehicles");
    for (const plateNumber of this.testVehicles) {
        console.log(`deleting test vehicle ${plateNumber}`);
        await this.fleetManagementService.deleteVehicle(plateNumber);
    }
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
