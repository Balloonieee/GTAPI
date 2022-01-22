//import and export everything

export class ServerManager() {
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
  
 /* getDimension({ dimension }) {
    const dimensions = ['overworld','the end','nether','all']
    if(!dimensions.includes(dimension)) 
      throw new Error(`${dimension} is not a valid dimension`)
    
    return dimension == 'all' ? {
      overworld: new Dimension('overworld'), nether: new Dimension('nether'), end: new Dimension('the end')
    } : World.getDimension('dimension')*/
  }

}

const Server = new ServerManager
export default Server
