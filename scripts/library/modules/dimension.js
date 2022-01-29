import { world } from 'mojang-minecraft'

export class dimension {
  constructor(dimensionId) {
    const validDimensions = ['overworld', 'nether', 'the end', 'all']
    if(!validDimensions.includes(dimensionId)) 
      throw new Error(`${dimensionId} is not a valid dimension`)
    
    this.dimensionId = dimensionId
    this.Mdimension = dimensionId == 'all' ? validDimensions.Map(dimensionId => {
      if(dimensionId == 'all') return
      return world.getDimension(dimensionId)
    }) : world.getDimension(dimensionId)
  }
  
  runCommand(cmd) {
    const commands = typeof cmd == 'array' ? cmd : [cmd]
    let commandsResults = commands.Map(command => {
      try {
        return this.dimensionId == 'all' ? this.Mdimension.Map(dimension => {
          return { dimensionId: dimension.id, error: false, ...dimension.runCommand(command) }
        }) : { dimensionId: this.Mdimension.id, error: false, ...this.Mdimension.runCommand(command) }
      } catch(e) {
        return {
          error: true,
          statusMessage: e.message
        }
      }
    })
    
    return this.dimensionId == 'all' ? commandsResult : commandsResult[0]
  }
}
