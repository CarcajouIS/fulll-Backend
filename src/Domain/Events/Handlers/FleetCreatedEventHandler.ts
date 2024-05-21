import {FleetCreatedEvent} from "../FleetCreatedEvent.js";

class FleetCreatedEventHandler {
    handle({params: {fleet: {id, userId}}}: FleetCreatedEvent): void {
        // Log the event
        console.log(`Fleet with id ${id} created by user ${userId}`);
    }
}

export {FleetCreatedEventHandler};
