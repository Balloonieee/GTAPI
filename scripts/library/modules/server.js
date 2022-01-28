import { world } from 'mojang-minecraft' // update in beta
//import other modules

class serverManager {
  constructor() {
    //servervarivaleshere
  }
   
  restart(restartMessage) {
    this.getDimension('all').kickPlayers({ reason: 'Server Restarted', administartor: 'server' })
  }
  
  database() {
    return new database()
  }
  
  getPlayers({ dataType, PlayerQueryOptions }) {
    const validTypes = ['list', 'object']
    if(!validTypes.includes(dataType)) 
      throw new Error(`${dataType} is not a valid dataType`)
    
    return type == 'object' ? [...World.getPlayers(PlayerQueryOptions ?? null).Map(mP => new player(mP))] : [...World.getPlayers().Map(mP => { name: mP?.name, nameTag: mP?.nameTag })]
  }
  
  getDimension(dimensionId) {
    const dimensions = ['overworld','the end','nether','all']
    if(dimensionId && !dimensions.includes(dimensionId)) 
      throw new Error(`${dimensionId} is not a valid dimension`)
    
    return dimensionId == 'all' ? {
      overworld: new Dimension('overworld'), nether: new Dimension('nether'), end: new Dimension('the end')
    } : World.getDimension(dimensionId ?? 'all')
}

export const server = new serverManager()
