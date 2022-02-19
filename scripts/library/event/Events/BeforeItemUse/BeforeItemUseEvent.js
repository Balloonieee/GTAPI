import { world } from 'mojang-minecraft'
import { BeforeItemUseEventResponse } from './index.js'

export class BeforeItemUseEvent {
    constructor(EventManager) {
        this.EventManager = EventManager
        this.eventName = 'beforeItemUse'
    }

    on() {
        this.event = world.events[this.eventName].subscribe(beforeItemUse => this.eventLogic(beforeItemUse))
    }

    off() {
        world.events[this.eventName].unsubscribe(this.event)
    }

    eventLogic(beforeItemUse) {
        this.EventManager.emit(this.eventName, new BeforeItemUseEventResponse(beforeItemUse))
    }
}
