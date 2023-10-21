// Exercise 01: Normalized Movement
// Name:  Aniruddh Sindhu
// Date:  10/20/2023

// Spritesheet by ElvGames: https://elv-games.itch.io/free-fantasy-dreamland-sprites

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scene: [ Movement ],
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
}

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config     //changing game.config.height also changes height here
let playerDirection = 'down'