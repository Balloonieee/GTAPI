import * as Events from './Events/index.js'
import { EventEmitter } from './EventEmitter.js'

class _EventManager extends EventEmitter {
    constructor() {
        super()
        this.defaultEvents = new Map()
        this._loadDefaultEvents()
    }
    
    _loadDefaultEvents() {
        for(const [key, eventClass] of Object.entries(Events)) {
            if(this.defaultEvents.get(key)) continue;
            const event = new eventClass(this)
            event.on()
            
            console.warn(`${key} event loaded`)

            this.defaultEvents.set(key, event)
        }
    }
    
    turnOnDefaultEvent(eventName) {
        let event = this.defaultEvents.get(eventName)
        if(!event || event.currentState) return
        
        event.on()
        this.defaultEvents.set(eventName, event)
    }
    
    turnOffDefaultEvent(eventName) {
        let event = this.defaultEvents.get(eventName)
        if(!event || !event.currentState) return
        
        event.off()
        this.defaultEvents.set(eventName, event)
    }
}

export const EventManager = new _EventManager