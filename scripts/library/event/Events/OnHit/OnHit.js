import { world } from 'mojang-minecraft'
import { OnHitEventResponse } from './index.js'

export class OnHitEvent {
    constructor(EventManager) {
        this.EventManager = EventManager
        this.eventName = 'entityHit'
    }
    
    on() {
        this.event = world.events['entityHit'].subscribe(hitData => this.eventLogic(hitData))
    }  
    
    off() {
        world.events['entityHit'].unsubscribe(this.event)
    }
    
    eventLogic(hitData) {
        this.EventManager.emit(this.eventName, new OnHitEventResponse(hitData))
    }
}