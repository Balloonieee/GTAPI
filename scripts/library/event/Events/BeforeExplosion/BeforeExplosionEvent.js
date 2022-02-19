import { world } from 'mojang-minecraft'
import { BeforeExplosionEventResponse } from './index.js'

export class BeforeExplosionEvent {
    constructor(EventManager) {
        this.EventManager = EventManager
        this.eventName = 'beforeExplosion'
    }
    
    on() {
        this.event = world.events[this.eventName].subscribe(explosionData => this.eventLogic(explosionData))
    }  
    
    off() {
        world.events[this.eventName].unsubscribe(this.event)
    }
    
    eventLogic(explosionData) {
        this.EventManager.emit(this.eventName, new BeforeExplosionEventResponse(explosionData))
    }
}