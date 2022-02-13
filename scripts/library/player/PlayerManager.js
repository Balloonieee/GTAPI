import { world as MWorld } from 'mojang-minecraft'
import { player } from './index.js'

class _PlayerManager {
  constructor() {
    this.MWorld = MWorld
  }
  
  getPlayers() {
    let MPlayers = [...this.MWorld.getPlayers()] ?? []

    return MPlayers?.length == 0 || !MPlayers ? [] : MPlayers.map(MPlayer => new player(MPlayer))
  }
  
 /* getPlayerByName(name) {
    return this.getPlayers().find(player => player.name == name || player.nameTag == name)
  }*/
}

export const PlayerManager = new _PlayerManager()