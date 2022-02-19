import { player } from '../../../player/index.js'
import { world } from 'mojang-minecraft'

export class BeforeChatEventResponse {
    constructor(MBeforeChatEventResponse) {
        this.MBeforeChatEventResponse = MBeforeChatEventResponse
    }
   
    cancel(value = false) {
      this.MBeforeChatEventResponse.cancel = value
    }
    
    _resendMessage(message) {
      if(!this.targets)
        return world.getDimension('overworld').runCommand(`tellraw @a ${JSON.stringify({rawtext:[{text: message}]})}`)
      
      this.targets.forEach(target => {
        world.getDimension('overworld').runCommand(`tellraw "${target}" ${JSON.stringify({rawtext:[{text: message}]})}`)
      })
    }
    
    getAuthor() {
      return new player(this.MBeforeChatEventResponse.sender)
    }
    
    getMessage() {
      return this.MBeforeChatEventResponse.message
    }
    
    editMessage(message) {
      this.MBeforeChatEventResponse.message = message
    }
    
    setMessage(message) {
      this.cancel(true)
      this._resendMessage(message)
    }
    
    setTargets(targets) {
      this.targets = typeof targets == 'string' ? [targets] : targets
    }
    
    getTargets() {
      return this.targets
    }
}