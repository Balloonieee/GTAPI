import { world } from 'mojang-minecraft'

export class TickEvent {
    constructor(EventManager) {
        this.currentState = false
        this.EventManager = EventManager
        this.eventName = 'tick'
    }
    
    on() {
        if(this.currentState) return

        this.event = world.events.tick.subscribe(tickData => this.eventLogic(tickData))
        this.currentState = true
    }  
    
    off() {
        if(!this.currentState) return

        world.events[this.eventName].unsubscribe(this.event)
        this.currentState = false 
    }
    
    eventLogic(tickData) {
        this.EventManager.emit(this.eventName, tickData)
    }
}