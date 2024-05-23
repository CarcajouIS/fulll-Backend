import {commands, queries} from "./index.js";
import {DomainEvents, events, model} from "../Domain/index.js";
import {AppDataSource} from "../Infra/index.js";

export class FleetManagementService {

    /**
     * Create a new fleet
     */
    async createFleet(userId: string, fleetId?: string): Promise<model.Fleet> {
        const fleet = await new commands.CreateFleetCommand({fleetId, userId}).execute();
        DomainEvents.publish(new events.FleetCreatedEvent({fleet}));
        return fleet;
    }

    /**
     * Create a new vehicle
     */
    async createVehicle(plateNumber: string): Promise<model.Vehicle> {
        const vehicle = await new commands.CreateVehicleCommand({plateNumber}).execute();
        DomainEvents.publish(new events.VehicleCreatedEvent({vehicle}));
        return vehicle;
    }

    /**
     * Delete a fleet
     */
    async deleteFleet(fleetId: string): Promise<void> {
        await new commands.DeleteFleetCommand({fleetId}).execute();
        DomainEvents.publish(new events.FleetDeletedEvent({id: fleetId}));
    }

    /**
     * Delete a vehicle
     */
    async deleteVehicle(plateNumber: string): Promise<void> {
        await new commands.DeleteVehicleCommand({plateNumber}).execute();
        DomainEvents.publish(new events.VehicleDeletedEvent({id: plateNumber}));
    }

    /**
     * Register a vehicle to a fleet
     */
    async registerVehicle(fleet: model.Fleet, vehicle: model.Vehicle): Promise<model.Fleet> {
        fleet = await new commands.RegisterVehicleCommand({fleet, vehicle}).execute() as model.Fleet;
        DomainEvents.publish(new events.VehicleRegisteredEvent({fleet, vehicle}));
        return fleet;
    }

    /**
     * Park a vehicle at a location
     */
    async parkVehicle(vehicle: model.Vehicle, location: model.Location): Promise<model.Vehicle> {
        vehicle = await new commands.ParkVehicleCommand({vehicle, location}).execute();
        DomainEvents.publish(new events.VehicleParkedEvent({vehicle, location}));
        return vehicle;
    }

    /**
     * Get fleet by ID
     */
    async getFleetById(id: string): Promise<model.Fleet | null> {
        return await AppDataSource.getRepository(model.Fleet).findOneBy(new queries.GetFleetByIdQuery(id));
    }

    /**
     * Get vehicle by plate number
     */
    async getVehicleByPlateNumber(plateNumber: string): Promise<model.Vehicle | null> {
        return await AppDataSource.getRepository(model.Vehicle).findOneBy(new queries.GetVehicleByPlateNumberQuery(
            plateNumber));
    }

    /**
     * Get vehicle location
     */
    async getVehicleLocation(plateNumber: string): Promise<model.Location | undefined> {
        return (await AppDataSource.getRepository(model.Vehicle).findOneBy(new queries.GetVehicleLocationQuery(
            plateNumber)))?.currentLocation;
    }


}