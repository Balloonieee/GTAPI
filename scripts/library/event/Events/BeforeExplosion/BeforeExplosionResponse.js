import { player } from '../../../player/index.js'
import { world } from 'mojang-minecraft'

export class BeforeExplosionEventResponse {
    constructor(MBeforeExplosionEventResponse) {
        this.MBeforeExplosionEventResponse = MBeforeExplosionEventResponse
    }
   
    cancel(value = false) {
      this.MBeforeExplosionEventResponse.cancel = value
    }
    
    getImpactedBlocks() {
      return this.MBeforeExplosionEventResponse.impactedBlocks
    }
    
    setImpactedBlocks(impactedBlocks) {
      this.MBeforeExplosionEventResponse.impactedBlocks = impactedBlocks
    }
    
    getSource() {
      return this.MBeforeExplosionEventResponse.source.id == 'minecraft:player' ? new player(this.MBeforeExplosionEventResponse.source) : 'entity class not done'
    }
    
    getDimension() {
      return this.MBeforeExplosionEventResponse.dimension
    }
}