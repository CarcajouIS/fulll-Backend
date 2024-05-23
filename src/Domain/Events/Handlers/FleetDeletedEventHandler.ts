import {type FleetDeletedEvent} from "../index.js";

export class FleetDeletedEventHandler {
    handle({params: {id}}: FleetDeletedEvent): void {
        // Log the event
        console.debug(`Fleet with id ${id} deleted`);
    }
}
