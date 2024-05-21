import {FleetDeletedEvent} from "../FleetDeletedEvent.js";

class FleetDeletedEventHandler {
    handle({params: {id}}: FleetDeletedEvent): void {
        // Log the event
        console.log(`Fleet with id ${id} deleted`);
    }
}

export {FleetDeletedEventHandler};
