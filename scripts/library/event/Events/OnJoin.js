import { world } from 'mojang-minecraft'
import { player } from '../../player/index.js'

export class OnJoinEvent {
    constructor(EventManager) {
        this.EventManager = EventManager
        this.eventName = 'playerJoin'
    }
    
    on() {
        this.event = world.events[this.eventName].subscribe(JoinData => this.eventLogic(JoinData))
    }  
    
    off() {
        world.events[this.eventName].unsubscribe(this.event)
    }
    
    eventLogic(joinData) {
        this.EventManager.emit(this.eventName, { player: new player(joinData.player) })
    }
}