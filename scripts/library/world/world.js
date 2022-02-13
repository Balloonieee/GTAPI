import { world as Mworld } from 'mojang-minecraft'

export class WorldManager {
  constructor() {
    this.Mworld = Mworld
  }
  
  getDimension() {}
}

export const world = new WorldManager()
