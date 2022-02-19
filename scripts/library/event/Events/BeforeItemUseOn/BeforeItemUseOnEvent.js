import { world } from 'mojang-minecraft'
import { BeforeItemUseOnEventResponse } from './index.js'

export class BeforeItemUseOnEvent {
    constructor(EventManager) {
        this.EventManager = EventManager
        this.eventName = 'beforeItemUseOn'
    }

    on() {
        this.event = world.events[this.eventName].subscribe(beforeItemUseOn => this.eventLogic(beforeItemUseOn))
    }

    off() {
        world.events[this.eventName].unsubscribe(this.event)
    }

    eventLogic(beforeItemUseOn) {
        this.EventManager.emit(this.eventName, new BeforeItemUseOnEventResponse(beforeItemUseOn))
    }
}