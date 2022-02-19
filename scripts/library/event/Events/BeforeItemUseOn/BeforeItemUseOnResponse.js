import { player } from '../../../player/index.js'

export class BeforeItemUseOnEventResponse {
    constructor(MBeforeItemUseOnResponse) {
        this.MBeforeItemUseOnResponse = MBeforeItemUseOnResponse
    }
   
    cancel(value = false) {
      this.MBeforeItemUseOnResponse.cancel = value
    }
    
    getBlockLocation() {
      return this.MBeforeItemUseOnResponse.blockLocation
    }
    
    getBlockFace() {
      return this.MBeforeItemUseOnResponse.blockFace
    }
    
    getFaceLocation() {
      return {
        x: this.MBeforeItemUseOnResponse.faceLocationX,
        z: this.MBeforeItemUseOnResponse.faceLocationY
      }
    }

    getSource() {
      return this.MBeforeItemUseOnResponse.source.id == 'minecraft:player' ? new player(this.MBeforeItemUseOnResponse.source) : 'entity class not done'
    }
    
    getItem() {
      return this.MBeforeItemUseOnResponse.item
    }
}