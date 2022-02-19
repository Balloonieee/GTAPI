import { server, Dimension } from '../library/GTAPI.js'
import { world } from 'mojang-minecraft'

server.events.on('tick', (tickData) => new Dimension("overworld").createExplosion({ location:{}, radius: 10, explosionConfiguration: { breakBlocks: true }}))

server.events.on('beforeChat', beforeChatPacket => console.warn(beforeChatPacket.getMessage()))

server.events.on('playerJoin', (joinData) => console.warn(joinData.player.getName() ?? joinData.player.getNameTag()))
server.events.on('playerLoad', (loadData) => console.warn(loadData.player.getName() ?? loadData.player.getNameTag(), loadData.tickToLoad))

server.events.on('beforeItemUse', (beforeItemUseData) => console.warn('beforeitemuse'))
server.events.on('beforeItemUseOn', (beforeItemUseData) => console.warn('beforeitemuseon'))

server.events.on('entityHit', (hitData) => console.warn('hit'))

//server.events.on('beforeExplosion', (explosionData) => explosionData.cancel(true))
server.events.on('tagCall', (data) => console.warn(data.tag))

