import { server } from '../library/GTAPI.js'
import { world } from 'mojang-minecraft'

server.events.on('playerJoin', (JoinData) => console.warn(JoinData.player.getName() ?? JoinData.player.getNameTag()))

server.events.on('playerLoad', (JoinData) => console.warn(JoinData.player, JoinData.tickToLoad))

//server.events.on('tick', (tickData) => console.warn(tickData))

world.events.beforeChat.subscribe(data => {
if(data.message == 'tp') server.players.getPlayers()[0]?.teleport({ location: [5, 20, 69], dimension: 'overworld', facingLocation: [60, 30, 70] })
})

