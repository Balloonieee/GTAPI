import { player } from '../../player/index.js'
import { world } from 'mojang-minecraft'

export class OnTagCallEvent {
	constructor(EventManager) {
		this.currentState = false
		this.EventManager = EventManager
		this.eventName = 'tagCall'
	}

	on() {
		if (this.currentState) return

		this.event = this.EventManager.on('tick', (tick) => this.eventLogic())
		this.currentState = true
	}

	off() {
		if (!this.currentState) return

		this.EventManager.removeListener('tick', this.event)
		this.currentState = false
	}

	eventLogic() {
		const entities = [
			...world.getPlayers(),
			...world.getDimension('overworld').getEntities(),
			...world.getDimension('The End').getEntities(),
			...world.getDimension('nether').getEntities()
		]

		entities?.forEach(entity => {
			const tags = entity.getTags()?.filter(tag => tag.startsWith('gtapi:'))?.map(tag => tag.replace('gtapi:', ''))

			if (!tags) return

			tags.forEach(tag => {
				this.EventManager.emit(this.eventName, {
					tag,
					entity: entity.id == 'minecraft:player' ? new player(entity) : entity
				});
				entity.removeTag(`gtapi:${tag}`)
			})
		})
	}
}