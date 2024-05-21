import {Given, Then, When} from "@cucumber/cucumber";
import {expect} from "chai";
import {model} from "../../src/Domain";

let result: string;

Given("a location", function () {
    const location = this.testLocations[0];
    this.location = new model.Location(location.longitude, location.latitude, location.altitude);
});

Given("my vehicle has been parked into this location", async function () {
    const location = await this.fleetManagementService.parkVehicle(this.vehicle, this.location);
    if (!location.equals(this.location)) {
        throw new Error("WTF");
    }
});

When(/^I(?: try to)? park my vehicle at this location$/, async function () {
    let location;
    try {
        location = await this.fleetManagementService.parkVehicle(this.vehicle, this.location);
        result = "success";
        if (!location?.equals(this.location)) {
            throw new Error("WTF");
        }
    } catch (error) {
        result = (error as Error).message;
    }
});

Then("the known location of my vehicle should verify this location", function () {
    expect(this.vehicle.currentLocation.equals(this.location)).to.be.true;
});

Then("I should be informed that my vehicle is already parked at this location", function () {
    expect(result).to.equal("Vehicle is already parked at this location");
});
