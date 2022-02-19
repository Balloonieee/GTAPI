import { world } from 'mojang-minecraft'
import { player } from '../../player/index.js'

export class OnLoadEvent {
	constructor(EventManager) {
		this.EventManager = EventManager
		this.eventName = 'playerLoad'
	}

	on() {
		this.event = this.EventManager.on('playerJoin', (joinData) => this.eventLogic(joinData))
	}

	off() {
		this.EventManager.removeListener('playerJoin', this.event)
	}

	eventLogic(joinData) {
		let tickToLoad = 0
		const user = joinData.player.getNameTag() ?? joinData.player.getName()

		const tickCallBack = (tick) => {
			try {
				const command = world.getDimension('overworld').runCommand(`testfor "${user}"`)
				this.EventManager.emit(this.eventName, {
					player: new player([...world.getPlayers()].find(player => player.name == user || player.nameTag == user)),
					tickToLoad
				})
				this.EventManager.removeListener('tick', tickCallBack)
			} catch (e) {
				return tickToLoad++
			}
		}

		this.EventManager.on('tick', tickCallBack)
	}
}