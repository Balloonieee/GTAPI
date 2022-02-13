import { Location, world } from 'mojang-minecraft'

export class player {
	constructor(MPlayer) {
		this.MPlayer = MPlayer
	}

	getMPlayer() {
		return this.MPlayer()
	}

	getName() {
		return this.MPlayer.name
	}

	getNameTag() {
		return this.MPlayer.nameTag
	}

	setNameTag(nameTag) {
		this.MPlayer.nameTag = nameTag
	}

	getTags() {
		return this.MPlayer.getTags()
	}

	addTag(tag) {
		if (this.MPlayer.hasTag(tag)) throw new Error(`player already has tag: ${tag}`)
		this.MPlayer.addTag(tag)
	}

	addTags(tags) {
		for (const tag of tags) {
			this.addTag(tag)
		}
	}

	removeTag(tag) {
		if (!this.MPlayer.hasTag(tag)) throw new Error(`player does not have tag: ${tag}`)
		this.MPlayer.removeTag(tag)
	}

	removeTags(tags) {
		for (const tag of tags) {
			this.removeTag(tag)
		}
	}

	hasTag(tag) {
		return this.MPlayer.hasTag(tag)
	}

	hasTags(tags) {
		return tags.every(tag => this.hasTag(tag))
	}

	runCommand(command) {
		try {
			const result = this.MPlayer.runCommand(command)
			return {
				error: false,
				data: result
			}
		} catch (e) {
			return {
				error: true,
				data: null
			}
		}
	}

	runCommands(commands) {
		commands.map(command => this.runCommand(command))
	}

	//scrbrd

	teleport({
		location: [locationX, locationY, locationZ],
		dimension,
		xRotation,
		yRotation,
		facingLocation: [facingLocationX, facingLocationY, facingLocationZ]
	}) {
		if (xRotation && yRotation) {
			this.MPlayer.teleport(new Location(locationX, locationY, locationZ), world.getDimension(dimension), xRotation, yRotation)
		}
		if (facingLocationX && facingLocationY && facingLocationZ) {
			this.MPlayer.teleportFacing(new Location(locationX, locationY, locationZ), world.getDimension(dimension), new Location(facingLocationX, facingLocationY, facingLocationZ))
		}
	}

	kick(reason = 'you have been kicked', administartor = 'server') {
		const success = this.runCommand(`kick ${this.getNameTag()} reason: ${reason}\nadministartor: ${administartor.toString()}`).error
		if(!success) throw new Error(`could not kick ${this.getNameTag()}`)
	}

	ban() {

	}

	unban() {

	}

	mute() {

	}

	unMute() {

	}
}  