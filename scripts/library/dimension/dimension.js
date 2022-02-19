import { world, BlockLocation, Location, ExplosionOptions } from 'mojang-minecraft'
import { player } from '../player/index.js'

export class Dimension {
  constructor(dimensionId) {
    const validDimensions = ['overworld', 'nether', 'the end']
    if(!validDimensions.includes(dimensionId)) 
      throw new Error(`${dimensionId} is not a valid dimension`)

    this.dimensionId = dimensionId
    this.MDimension = world.getDimension(this.dimensionId)
  }
  
  getId() {
    return this.MDimension.id
  }
  
  runCommand(command) {
    try {
      const result = this.MDimension.runCommand(command)
      return {
        error: false,
        data: result
      }
    } catch(e) {
      return {
        error: true,
        statusMessage: e.message
      }
    }
  }
  
  runCommands(commands) {
    return commands.map(command => {
      this.runCommand(command)
    })
  }
  
  getEntitiesAtBlock({ location: { x = 0, y = 0, z = 0 }, ignoreList = [] }) {
    const location = new BlockLocation(x, y, z)
    return this.MDimension.getEntitiesAtBlockLocation(BlockLocation)?.filter(entity => !ignoreList.includes(entity.id))?.map(entity => {
      entity.id == 'minecraft:player' ? new player(entity) : entity
    })
  }
  
  getEntitiesFromRay({ location: { x = 0, y = 0, z = 0 }, direction, options = null, ignoreList = [] }) {
    let loc = new Location(x, y, z)
    this.MDimension.getEntitiesFromRay(loc, direction, options)?.filter(entity => !ignoreList.includes(entity.id))?.map(entity => {
      entity.id == 'minecraft:player' ? new player(entity) : entity
    })
  }
  
  getPlayers(query = null) {
   return [...this.MDimension.getPlayers(query)]?.map(user => new player(user)) ?? []
  }
  
  getPlayer(name) {
    return this.getPlayers().find(player => player.getName() == name || player.getNameTag() == name)
  }
  
  getBlock({ location: { x = 0, y = 0, z = 0 }}) {
    return this.MDimension.getBlock(x, y, z)
  }
  
  getBlockFromRay({ location: { x = 0, y = 0, z = 0 }, direction, options = null }) {
    let loc = new BlockLocation(x, y, z)
    return this.MDimension.getBlockFromRay(loc, direction, options)
  }
  
  spawnItem({ item, location: { x = 0, y = 0, z = 0 } }) {
    return this.MDimension.spawnItem(item, new Location(x, y, z))
  }
  
  spawnParticle({ effectName, location: { x = 0, y = 0, z = 0 }, molangVariables }) {
    this.MDimension.spawnParticle(effectName, new Location(x, y, z), molangVariables)
  }
  
  spawnEntity({ identifier, location: { x = 0, y = 0, z = 0 } }) {
    return this.MDimension.spawnEntity(identifier, new Location(x, y, z))
  }
  
  createExplosion({ location: { x = 0, y = 0, z = 0 }, radius = 1, explosionConfiguration }) {
    let explosionOptions = new ExplosionOptions()
    
    for(const [key, val] of Object.entries({ allowUnderwater: false, breakBlocks: true, causesFire: false, ...explosionConfiguration })) {
      explosionOptions[key] = val
    }
    
    try { this.MDimension.createExplosion(new Location(x, y, z), radius, explosionOptions) } catch(e) { console.warn(e) }
  }
  
  kickAllPlayers() {
    this.getPlayers().forEach((player) => {
       player.kick()
    })
  }
  
  killAllPlayers() {
    this.getPlayers().forEach((player) => {
       player.kill()
    })
  }
  
  teleportAllPlayers() {}
  
  broadcastAllPlayers() {}
  
  sendSoundAllPlayers() {}
}