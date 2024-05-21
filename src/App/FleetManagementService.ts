import {DomainEvents, events} from "../Domain/index.js";
import {commands, queries} from "./index.js";
import {Fleet, Location, Vehicle} from "../Domain/Model/index.js";
import {FleetRepository, VehicleRepository} from "../Infra/Repositories/index.js";

class FleetManagementService {

    /**
     * Create a new fleet
     */
    async createFleet(userId: string, fleetId?: string): Promise<Fleet> {
        const fleet = await new commands.CreateFleetCommand({fleetId, userId}).execute();
        DomainEvents.publish(new events.FleetCreatedEvent({fleet}));
        return fleet;
    }

    /**
     * Create a new vehicle
     */
    async createVehicle(plateNumber: string): Promise<Vehicle> {
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
    async registerVehicle(fleet: Fleet, vehicle: Vehicle): Promise<Fleet> {
        fleet = await new commands.RegisterVehicleCommand({fleet, vehicle}).execute() as Fleet;
        DomainEvents.publish(new events.VehicleRegisteredEvent({fleet, vehicle}));
        return fleet;
    }

    /**
     * Park a vehicle at a location
     */
    async parkVehicle(vehicle: Vehicle, location: Location): Promise<Vehicle> {
        vehicle = await new commands.ParkVehicleCommand({vehicle, location}).execute();
        DomainEvents.publish(new events.VehicleParkedEvent({vehicle, location}));
        return vehicle;
    }

    /**
     * Get fleet by ID
     */
    async getFleetById(id: string): Promise<Fleet | null> {
        return await FleetRepository.findOneBy(new queries.GetFleetByIdQuery(id));
    }

    /**
     * Get vehicle by plate number
     */
    async getVehicleByPlateNumber(plateNumber: string): Promise<Vehicle | null> {
        return await VehicleRepository.findOneBy(new queries.GetVehicleByPlateNumberQuery(plateNumber));
    }

    /**
     * Get vehicle location
     */
    async getVehicleLocation(plateNumber: string): Promise<Location | undefined> {
        return (await VehicleRepository.findOneBy(new queries.GetVehicleLocationQuery(plateNumber)))?.currentLocation;
    }


}

export {FleetManagementService};
