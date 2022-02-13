import { server } from '../library/GTAPI.js'
import { world } from 'mojang-minecraft'

//server.events.on('tick', (tickData) => console.warn(tickData))

server.events.on('beforeChat', beforeChatPacket => console.warn(beforeChatPacket.message))

server.events.on('playerJoin', (joinData) => console.warn(joinData.player.getName() ?? joinData.player.getNameTag()))
server.events.on('playerLoad', (loadData) => console.warn(loadData.player.getName() ?? joinData.player.getNameTag(), JoinData.tickToLoad))
