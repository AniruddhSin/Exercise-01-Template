class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    preload() {
        this.load.spritesheet('character', "./assets/spritesheets/Character_002.png", {
            frameWidth : 48
            //frameHeight : 48      //not needed because frameWidth and frameHeight are the same so Phaser duplicates it
        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xFACADE)

        this.player = this.physics.add.sprite(width/2, height/2, 'character', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(32,40).setOffset(8,9)
        this.PLAYER_VELOCITY = 400

        cursors = this.input.keyboard.createCursorKeys()

        this.anims.create({
            key: 'idle-down',   //name
            frameRate: 0,       //how many fps on this animation
            repeat: -1,         //how many times the animation loops (-1 = inf)
            frames: this.anims.generateFrameNumbers('character',{
                start: 1,       //start at which frame in spritesheet
                end: 1          //end at which frame in spritesheet
            })    //range of frames to use from spritesheet
        })
        this.anims.create({
            key: 'idle-up',   //name
            frameRate: 0,       //how many fps on this animation
            repeat: -1,         //how many times the animation loops (-1 = inf)
            frames: this.anims.generateFrameNumbers('character',{
                start: 10,       //start at which frame in spritesheet
                end: 10          //end at which frame in spritesheet
            })    //range of frames to use from spritesheet
        })
        this.anims.create({
            key: 'idle-right',   //name
            frameRate: 0,       //how many fps on this animation
            repeat: -1,         //how many times the animation loops (-1 = inf)
            frames: this.anims.generateFrameNumbers('character',{
                start: 7,       //start at which frame in spritesheet
                end: 7          //end at which frame in spritesheet
            })    //range of frames to use from spritesheet
        })
        this.anims.create({
            key: 'idle-left',   //name
            frameRate: 0,       //how many fps on this animation
            repeat: -1,         //how many times the animation loops (-1 = inf)
            frames: this.anims.generateFrameNumbers('character',{
                start: 4,       //start at which frame in spritesheet
                end: 4          //end at which frame in spritesheet
            })    //range of frames to use from spritesheet
        })

        this.anims.create({
            key: 'walk-down',   //name
            frameRate: 4,       //how many fps on this animation
            repeat: -1,         //how many times the animation loops (-1 = inf)
            yoyo: true,
            frames: this.anims.generateFrameNumbers('character',{
                start: 0,
                end: 2
            })    //range of frames to use from spritesheet
        })
        this.anims.create({
            key: 'walk-up',   //name
            frameRate: 4,       //how many fps on this animation
            repeat: -1,         //how many times the animation loops (-1 = inf)
            yoyo: true,
            frames: this.anims.generateFrameNumbers('character',{
                start: 9,
                end: 11
            })    //range of frames to use from spritesheet
        })
        this.anims.create({
            key: 'walk-left',   //name
            frameRate: 4,       //how many fps on this animation
            repeat: -1,         //how many times the animation loops (-1 = inf)
            yoyo: true,
            frames: this.anims.generateFrameNumbers('character',{
                start: 3,
                end: 5
            })    //range of frames to use from spritesheet
        })
        this.anims.create({
            key: 'walk-right',   //name
            frameRate: 4,       //how many fps on this animation
            repeat: -1,         //how many times the animation loops (-1 = inf)
            yoyo: true,
            frames: this.anims.generateFrameNumbers('character',{
                start: 6,
                end: 8
            })    //range of frames to use from spritesheet
        })

        //this.player.play('walk-down')   //just to see the object animation for debugging purposes


    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0,0)

        if(cursors.left.isDown){
            playerVector.x = -1
            playerDirection = 'left'
        }else if(cursors.right.isDown){
            playerVector.x = 1
            playerDirection = 'right'
        }

        if(cursors.up.isDown){
            playerVector.y = -1
            playerDirection = 'up'
        }else if (cursors.down.isDown){
            playerVector.y = 1
            playerDirection = 'down'
        }
        playerVector.normalize() //make vectors diagonal same

        //this.player.x += playerVector.x * this.PLAYER_VELOCITY
        //this.player.y += playerVector.y * this.PLAYER_VELOCITY
        this.player.setVelocity(this.PLAYER_VELOCITY*playerVector.x , this.PLAYER_VELOCITY*playerVector.y)

        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
        //if playerVector.length == 0, then false, otherwise true
        //set to 'walk' if true and 'idle' if false
        this.player.play(playerMovement+'-'+playerDirection, true) //true for ignore this animation call if already playing
    }
}