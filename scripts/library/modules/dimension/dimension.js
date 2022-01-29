import { world, EntityQueryOptions } from 'mojang-minecraft'

export class dimension {
  constructor(dimensionId) {
    const validDimensions = ['overworld', 'nether', 'the end', 'all']
    if(!validDimensions.includes(dimensionId)) 
      throw new Error(`${dimensionId} is not a valid dimension`)
    
    this.dimensionId = dimensionId
    this.Mdimension = dimensionId == 'all' ? validDimensions.Map(dimension => {
      if(dimension == 'all') return
      return world.getDimension(dimension)
    }) : world.getDimension(dimension)
  }
  
  runCommand(cmd) { //runCommand and runCommands in 1
    const commands = typeof cmd == 'array' ? cmd : [cmd]
    let commandsResults = commands.Map(command => {
      
      if(this.dimensionId == 'all') {
        return this.Mdimension.Map(dimension => {
          try {
            return { dimensionId: dimension.id, error: false, ...dimension.runCommand(command) }
          } catch(e) {
            return {
              error: true,
              statusMessage: e.message,
              dimension: dimension.id
            }
          }
        })
      }
      
      try {
        return { dimensionId: dimension.id, error: false, ...dimension.runCommand(command) }
      } catch(e) {
        return {
          error: true,
          statusMessage: e.message,
          dimension: dimension.id
        }
      }
      
    })
    
    return this.dimensionId == 'all' ? commandsResult : commandsResult[0]
  }
  
  getEntitiesAtBlock(block) {
    return dimension.getEntitiesAtBlockLocation(block)
  }
  
  getPlayers(query) {
    return dimension.getPlayers(query)
  }
  
  getPlayer(player) {
    return dimension.getPlayers(new EntityQueryOptions().name == player)
  }
  
  kickAllPlayers() {
    dimension.getPlayers().forEach((player) => {
       player.kick()
    })
  }
  
  killAllPlayers() {
    dimension.getPlayers().forEach((player) => {
       player.kill()
    })}
}
