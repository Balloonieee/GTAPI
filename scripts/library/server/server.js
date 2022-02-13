import { world } from '../world/index.js'
import { PlayerManager } from '../player/index.js'
import { EventManager } from '../event/index.js'
//import { database } from '../database/index.js'

class serverManager {
  constructor() {
    this.world = world
    this.players = PlayerManager
    this.events = EventManager
    //this.database = database
  }
}

export const server = new serverManager()