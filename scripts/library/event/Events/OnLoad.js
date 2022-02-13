import { world } from 'mojang-minecraft'
import { player } from '../../player/index.js'

export class OnLoadEvent {
    constructor(EventManager) {
        this.EventManager = EventManager
        this.eventName = 'playerLoad'
    }
    
    on() {
        this.event = world.events.playerJoin.subscribe(JoinData => this.eventLogic(JoinData))
    }  
    
    off() {
        world.events.playerJoin.unsubscribe(this.event)
    }
    
    eventLogic(joinData) {
        let tickToLoad = 0
        const user = joinData.player.nameTag ?? joinData.player.name

        const tickCallBack = (tick) => {
            try {
                const command = world.getDimension('overworld').runCommand(`testfor Ball00nbag`)
                this.EventManager.emit(this.eventName, { player: new player([...world.getPlayers()].find(player => player.name == user || player.nameTag == user)), tickToLoad })
                world.events.tick.unsubscribe(tickCallBack)
            } catch(e) {
                return tickToLoad++
            }
        }
        
        world.events.tick.subscribe(tickCallBack)
    }
}
