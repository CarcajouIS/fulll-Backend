import {Given, Then, When} from "@cucumber/cucumber";
import {expect} from "chai";
import {Location} from "../../src/Domain/Model/Location.js";
import * as R from "ramda";

let result: string;

Given("a location", function () {
    const location = this.testLocations[0];
    this.location = new Location(location.longitude, location.latitude, location.altitude);
});

Given("my vehicle has been parked into this location", async function () {
    this.vehicle = await this.fleetManagementService.parkVehicle(this.vehicle, this.location);
});

When(/^I(?: try to)? park my vehicle at this location$/, async function () {
    try {
        this.vehicle = await this.fleetManagementService.parkVehicle(this.vehicle, this.location);
        result = "success";
    } catch (error) {
        result = (error as Error).message;
    }
});

Then("the known location of my vehicle should verify this location", function () {
    expect(R.equals(this.vehicle?.currentLocation, this.location)).to.be.true;
});

Then("I should be informed that my vehicle is already parked at this location", function () {
    expect(result).to.equal("Vehicle is already parked at this location");
});
