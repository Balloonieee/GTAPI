import { World, Commands } from 'mojang-minecraft' // update in beta
import { player } from './player.js'
class serverManager {
  constructor() {
  }
  
  init() {
    
  }

  getPlayers(type) {
    const validTypes = ['list', 'object']
    if(!validTypes.includes(type)) 
      throw new Error(`${type} is not a valid type`)
    
    return type == 'object' ? World.getPlayers().Map(mP => new player(mP)) : World.getPlayers().Map(mP => { name: mP?.name, nameTag: mP?.nameTag })
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
