import {After, Before, BeforeAll, Given} from "@cucumber/cucumber";
import {FleetManagementService, FleetManagementServiceFactory} from "../../src/App";

let fleetManagementService: FleetManagementService;
const testFleets = [{fleetId: "fleet1", userId: "user1"}, {fleetId: "fleet2", userId: "user2"}];
const testVehicles = [{plateNumber: "vehicle1"}];
const testLocations = [{latitude: 40.7128, longitude: -74.0060, altitude: 0}];
BeforeAll(function () {
    console.log("creating fleet-service");
    fleetManagementService = FleetManagementServiceFactory.create();
});

Before(function () {
    this.fleetManagementService = fleetManagementService;
    this.testFleets = testFleets;
    this.testVehicles = testVehicles;
    this.testLocations = testLocations;
});

After(function () {
    //Cleanup
    console.log("deleting test objects");
    console.log("deleting test fleets");
    for (const {fleetId} of this.testFleets) {
        console.log(`deleting test fleet ${fleetId}`);
        this.fleetManagementService.deleteFleet(fleetId);
    }
    console.log("deleting test vehicles");
    for (const {plateNumber} of this.testVehicles) {
        console.log(`deleting test vehicle ${plateNumber}`);
        this.fleetManagementService.deleteVehicle(plateNumber);
    }
});

Given("my fleet", async function () {
    const fleet = this.testFleets[0];
    this.fleet = await this.fleetManagementService.createFleet(fleet.fleetId, fleet.userId);
});

Given("a vehicle", async function () {
    const vehicle = this.testVehicles[0];
    this.vehicle = await this.fleetManagementService.createVehicle(vehicle.plateNumber);
});

Given("I have registered this vehicle into my fleet", async function () {
    const fleet = await this.fleetManagementService.registerVehicle(this.fleet, this.vehicle);
    if (!fleet.equals(this.fleet)) {
        throw new Error("WTF");
    }
});
