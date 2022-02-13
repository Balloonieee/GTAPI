import { world } from 'mojang-minecraft'

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
        this.EventManager.emit(this.eventName, {
            cancel: beforeItemUse.cancel,
            item: beforeItemUse.item,
            source: beforeItemUse.source,
        })
    }
}
