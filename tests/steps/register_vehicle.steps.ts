import {Given, Then, When} from "@cucumber/cucumber";
import {expect} from "chai";

let result: string;

Given("the fleet of another user", async function () {
    this.anotherFleet = await this.fleetManagementService.createFleet(this.testUsers[1]);
    this.testFleets.push(this.anotherFleet.id);
});

When(/^I(?: try to)? register this vehicle into my fleet$/, async function () {
    try {
        this.fleet = await this.fleetManagementService.registerVehicle(this.fleet, this.vehicle);
        result = "success";
    } catch (error) {
        result = (error as Error).message;
    }
});

When("this vehicle has been registered into the other user's fleet", async function () {
    this.anotherFleet = await this.fleetManagementService.registerVehicle(this.anotherFleet, this.vehicle);
});

Then("this vehicle should be part of my vehicle fleet", function () {
    expect(this.fleet.hasVehicle(this.vehicle)).to.be.true;
});

Then("I should be informed that this vehicle has already been registered into my fleet", function () {
    expect(result).to.equal(`Vehicle ${this.vehicle.plateNumber} has not been added, already registered`);
});
