import { world } from 'mojang-minecraft'
//import other modules

class serverManager {
  constructor() {
    this.Mworld = world
    this.events = events
    this.claims = claims
    this.factions = factions
    this.parties = parties
    this.scoreboard = scoreboard
    this.tags = tags
    this.chat = chat
    this.slashCommands = commands.slashCommands //edit this to just slashcmd when module added also cuz we wont have commands.run it will be dim.runcmd
    this.auctionHouse = auctionHouse
    this.database = database
    this.ranks = ranks
    this.leaderboards = leaderboards
    this.formUI = formUI
    this.scheduling = scheduling
    this.warps = warps
  }
   
  restart(restartMessage) {
    this.getDimension('all').kickAllPlayers({ reason: 'Server Restarting...', administartor: 'server' })
  }
  
  getPlayers({ status, dataType, PlayerQueryOptions }) {
    const validTypes = ['list', 'object']
    if(!validTypes.includes(dataType)) 
      throw new Error(`${dataType} is not a valid dataType`)
    
    return status == 'offline' ? this.database.table('players').all().map(player => player.value) : dataType == 'object' ? [...this.Mworld.getPlayers(PlayerQueryOptions ?? null).Map(mP => new player(mP))] : [...this.Mworld.getPlayers().Map(mP => { name: mP?.name, nameTag: mP?.nameTag })]
  }
  
  getPlayer({ username, status }) {
    return this.getPlayers({ status, dataType: 'object' }).find(player => player.nameTag == username || player.name == username)
  }
  
  getDimension(dimensionId) {
    const dimensions = ['overworld','the end','nether','all']
    if(dimensionId && !dimensions.includes(dimensionId)) 
      throw new Error(`${dimensionId} is not a valid dimension`)
    
    return new Dimension(dimensionId ?? 'all')
}

export const server = new serverManager()