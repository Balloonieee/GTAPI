import { world } from 'mojang-minecraft' // update in beta
//import other modules

class serverManager {
  constructor() {
  }
  
  init() {
    
  }
  
  restart(message) {}
  
  database() {}
  
  getPlayers({ type, PlayerQueryOptions }) {
    const validTypes = ['list', 'object']
    if(!validTypes.includes(type)) 
      throw new Error(`${type} is not a valid type`)
    
    return type == 'object' ? [...World.getPlayers().Map(mP => new player(mP))] : [...World.getPlayers().Map(mP => { name: mP?.name, nameTag: mP?.nameTag })]
  }
  
  getDimension(dimension) {
    const dimensions = ['overworld','the end','nether','all']
    if(!dimensions.includes(dimension)) 
      throw new Error(`${dimension} is not a valid dimension`)
    
    return dimension == 'all' ? {
      overworld: new Dimension('overworld'), nether: new Dimension('nether'), end: new Dimension('the end')
    } : World.getDimension('dimension')
}

export const server = new serverManager()
