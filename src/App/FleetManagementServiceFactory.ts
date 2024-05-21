import {FleetManagementService} from "./FleetManagementService.js";
import {eventHandlers} from "../Domain/Events/index.js";
import {DomainEvents} from "../Domain/index.js";

class FleetManagementServiceFactory {
    static create(): FleetManagementService {
        DomainEvents.register("FleetCreatedEvent", new eventHandlers.FleetCreatedEventHandler().handle);
        DomainEvents.register("FleetDeletedEvent", new eventHandlers.FleetDeletedEventHandler().handle);
        DomainEvents.register("VehicleRegisteredEvent", new eventHandlers.VehicleRegisteredEventHandler().handle);
        DomainEvents.register("VehicleCreatedEvent", new eventHandlers.VehicleCreatedEventHandler().handle);
        DomainEvents.register("VehicleDeletedEvent", new eventHandlers.VehicleDeletedEventHandler().handle);
        DomainEvents.register("VehicleParkedEvent", new eventHandlers.VehicleParkedEventHandler().handle);

        return new FleetManagementService();
    }
}

export {FleetManagementServiceFactory};
