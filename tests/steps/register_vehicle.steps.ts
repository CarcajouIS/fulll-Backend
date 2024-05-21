import {Given, Then, When} from "@cucumber/cucumber";
import {expect} from "chai";

let result: string;

Given("the fleet of another user", async function () {
    const anotherFleet = this.testFleets[1];
    this.anotherFleet = await this.fleetManagementService.createFleet(anotherFleet.fleetId, anotherFleet.userId);
});

When(/^I(?: try to)? register this vehicle into my fleet$/, async function () {
    let fleet;
    try {
        fleet = await this.fleetManagementService.registerVehicle(this.fleet, this.vehicle);
        result = "success";
        if (!fleet?.equals(this.fleet)) {
            throw new Error("WTF");
        }
    } catch (error) {
        result = (error as Error).message;
    }
});

When("this vehicle has been registered into the other user's fleet", async function () {
    const fleet = await this.fleetManagementService.registerVehicle(this.anotherFleet, this.vehicle);
    if (!fleet.equals(this.anotherFleet)) {
        throw new Error("WTF");
    }
});

Then("this vehicle should be part of my vehicle fleet", function () {
    expect(this.fleet.hasVehicle(this.vehicle)).to.be.true;
});

Then("I should be informed that this vehicle has already been registered into my fleet", function () {
    expect(result).to.equal(`Vehicle ${this.vehicle.plateNumber} has not been added, already registered`);
});
