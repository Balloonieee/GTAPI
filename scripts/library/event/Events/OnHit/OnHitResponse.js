import { player } from '../../../player/index.js'
import { world } from 'mojang-minecraft'

export class OnHitEventResponse {
    constructor(MOnHitEventResponse) {
        this.MOnHitEventResponse = MOnHitEventResponse
    }
   
    cancel(value = false) {
      this.MOnHitEventResponse.cancel = value
    }
    
    getAgresor() {
      return this.MOnHitEventResponse.entity.source.id == 'minecraft:player' ? new player(this.MOnHitEventResponse.source) : 'entity class not done'
    }
    
    getHitBlock() {
      if(!this.MOnHitEventResponse.hitBlock) return 'minecraft:air'
      
      return this.MOnHitEventResponse.hitBlock
    }
    
    getHitEntity() {
      if(!this.MOnHitEventResponse.hitEntity) return
      
      return this.MOnHitEventResponse.hitEntity.source.id == 'minecraft:player' ? new player(this.MOnHitEventResponse.source) : 'entity class not done'
    }
    
    getTargetType() {
      if(this.getHitBlock == 'minecraft:air' && !this.getHitEntity()) return 'none'
      
      return this.getHitBlock != 'minecraft:air' ? 'block' : 'entity'
    }
}