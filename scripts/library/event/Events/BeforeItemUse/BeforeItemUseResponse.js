import { player } from '../../../player/index.js'

export class BeforeItemUseEventResponse {
    constructor(MBeforeItemUseResponse) {
        this.MBeforeItemUseResponse = MBeforeItemUseResponse
    }
   
    cancel(value = false) {
      this.MBeforeItemUseResponse.cancel = value
    }
    
    getSource() {
      return this.MBeforeItemUseResponse.source.id == 'minecraft:player' ? new player(this.MBeforeItemUseResponse.source) : 'entity class not done'
    }
    
    getItem() {
      return this.MBeforeItemUseResponse.item
    }
}