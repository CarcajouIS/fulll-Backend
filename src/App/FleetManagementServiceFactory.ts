import {FleetManagementService} from "./FleetManagementService.js";
import {DomainEvents, events} from "../Domain/index.js";

export class FleetManagementServiceFactory {
    static async create(): Promise<FleetManagementService> {

        DomainEvents.register("FleetCreatedEvent", new events.handlers.FleetCreatedEventHandler().handle);
        DomainEvents.register("FleetDeletedEvent", new events.handlers.FleetDeletedEventHandler().handle);
        DomainEvents.register("VehicleRegisteredEvent", new events.handlers.VehicleRegisteredEventHandler().handle);
        DomainEvents.register("VehicleCreatedEvent", new events.handlers.VehicleCreatedEventHandler().handle);
        DomainEvents.register("VehicleDeletedEvent", new events.handlers.VehicleDeletedEventHandler().handle);
        DomainEvents.register("VehicleParkedEvent", new events.handlers.VehicleParkedEventHandler().handle);

        return new FleetManagementService();
    }
}
