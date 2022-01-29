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
    }) : [world.getDimension(dimensionId)] 
  }
  
  runCommand(command) {
    
  }
  //maybe ill make it just 1 method for run cmd
  
  runCommands(commands) {
    
  }
}
