import { world } from 'mojang-minecraft'
import { player } from '../../player/index.js'

export class BeforeChatEvent {
    constructor(EventManager) {
        this.EventManager = EventManager
        this.eventName = 'beforeChat'
    }

    on() {
        this.event = world.events[this.eventName].subscribe(beforeChat => this.eventLogic(beforeChat))
    }

    off() {
        world.events[this.eventName].unsubscribe(this.event)
    }

    eventLogic(beforeChat) {
        this.EventManager.emit(this.eventName, beforeChat)
    }
}
