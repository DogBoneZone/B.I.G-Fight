import { createCharacters } from './script.js'

// define characters
const player = createCharacters()[Number(sessionStorage.getItem('selectedCharacter'))]
const rival = createCharacters()[Number(sessionStorage.getItem('rivalCharacter'))]

function createSceneElements() {
    // let player = characters[Number(sessionStorage.getItem('selectedCharacter'))]
    // let rival = characters[Number(sessionStorage.getItem('rivalCharacter'))]

    // Create Player Status Bars
    let fighter1 = document.createElement('div')
    fighter1.classList.add('statusContainer')
    fighter1.innerHTML = ` <div>${player.name}</div>
                            <div class="hpMax">
                                <div id="playerHP" class="hpCurrent"></div>
                            </div>
                            <div class="energyMax">
                                <div id="playerEnergy" class="energyCurrent"></div>
                            </div>`

    let fighter2 = document.createElement('div')
    fighter2.classList.add('statusContainer')
    fighter2.innerHTML = ` <div>${rival.name}</div>
                            <div class="hpMax">
                                <div id="rivalHP" class="hpCurrent"></div>
                            </div>
                            <div class="energyMax">
                                <div id="rivalEnergy" class="energyCurrent"></div>
                            </div>`

    document.querySelector('.fighter1Status').append(fighter1)
    document.querySelector('.fighter2Status').append(fighter2)

    // Create Player Sprites
    let playerSprite = document.createElement('img')
    playerSprite.src = player.img
    playerSprite.classList.add('sprite')
    document.querySelector('.position1').append(playerSprite)

    let rivalSprite = document.createElement('img')
    rivalSprite.src = rival.img
    rivalSprite.classList.add('sprite')
    document.querySelector('.position2').append(rivalSprite)

    // Create special move buttons
    let specialMove = document.createElement('button')
    specialMove.id = 'special'
    specialMove.type = 'button'
    specialMove.textContent = player.special.name
    specialMove.classList.add('move')
    document.querySelector('.moveButtons').append(specialMove)

    // Assign Random Background
    let backgrounds = [
        './images/elements/backgrounds/ruined-temple.gif',
        './images/elements/backgrounds/dark-scene.gif',
        './images/elements/backgrounds/jungle-scene.gif'
    ]

    document.querySelector('.fightArea').style.backgroundImage = `url('${backgrounds[(Math.floor(Math.random() * backgrounds.length))]}')`

}

function applyStatusChanges() {
    let players = [player, rival]

    for (let cha of players) {
        let hpProportion = (cha.hp.current / cha.hp.max) * 100
        let energyProportion = (cha.energy.current / cha.energy.max) * 100

        switch (cha === player) {
            case true:
                document.querySelector('#playerHP').style.width = `${hpProportion}%`
                document.querySelector('#playerEnergy').style.width = `${energyProportion}%`
                break
            
            case false: 
                document.querySelector('#rivalHP').style.width = `${hpProportion}%`
                document.querySelector('#rivalEnergy').style.width = `${energyProportion}%`
                break
        }
    }
}

// Add button listeners
function addListeners() {
    document.querySelector('#goToSelectScreen').addEventListener('click', () => {
        window.location.href = 'index.html'
    })

    // add listener for music toggle
    document.querySelector('#audioToggle').addEventListener('click', () => {
        playMusic()
    })

    // add listners for move buttons
    for (let button of [...document.querySelectorAll('.move')]) {
        if (button.id === 'punch') {
            button.addEventListener('click', () => {
                moveList.punchMove(player)
            })
        }
        else if (button.id === 'kick') {
            button.addEventListener('click', () => {
                moveList.kickMove(player)
            })
        }
        else if (button.id === 'defend') {
            button.addEventListener('click', () => {
                moveList.defendMove(player)
            })
        }
        else if (button.id === 'special') {
            button.addEventListener('click', () => {
                moveList.specialMove(player)
            })
        }
    }
}

function playMusic() {
    let audio = document.querySelector('#audioTag')
    audio.loop = true
    let isPaused = audio.paused

    switch (isPaused) {
        case true: 
            audio.play()
            break
        
        case false: 
            audio.pause()
            break
    }
}

function introCountDown() {
    let container = document.querySelector('.formContainer')
    let countReady = `<div>Ready?</div>`
    let count3 = `<div>3</div>`
    let count2 = `<div>2</div>`
    let count1 = `<div>1</div>`
    let countFight = `<div>FIGHT!</div>`

    container.innerHTML = countReady
    setTimeout( () => {
            container.removeChild(container.firstChild)
            container.innerHTML = count3
    }, 1500
    )

    setTimeout( () => {
        container.removeChild(container.firstChild)
        container.innerHTML = count2
    }, 2500
    )

    setTimeout( () => {
        container.removeChild(container.firstChild)
        container.innerHTML = count1
    }, 3500
    )

    setTimeout( () => {
        container.removeChild(container.firstChild)
        container.innerHTML = countFight
    }, 4500
    )

    setTimeout( () => {
        container.removeChild(container.firstChild)
        document.querySelector('.beginFightForm').classList.remove('active')
        // document.querySelector('.fightArea').removeChild(document.querySelector('.beginFightForm'))
        document.querySelector('.moveButtons').classList.add('active')
    }, 5500
)
}

const game = {
    checkForDeath() {
        let deadPlayer
        for (let cha of [player, rival]) {
            console.log(cha.hp)
            if (cha.hp.current <= 0) {deadPlayer = cha}
            break
        }
        return deadPlayer
    },

    endGame(deadPlayer) {
        switch (deadPlayer == player) {
            case true: 
                document.querySelector('.position2').classList.add('winner')
                break
            
            case false: 
                console.log("This statement is false, meaning the Rival is dead.")
                document.querySelector('.position1').classList.add('winner')
                break
        }
    }
}


// Still needs defend logic
const moveList = {
    punchMove(playerLabel) {
        let punchObject = playerLabel.punch()
        let roll = (Math.random() * 100).toFixed(0)

        // Run Accuracy vs Roll
        switch (punchObject.acc > roll) {
            case true:
                console.log("Hit!")
                rival.hp.current = rival.hp.current - punchObject.dmg
                break
            
            case false:
                console.log("Miss!")
        }
        console.log(game.checkForDeath())
        if (game.checkForDeath() != undefined) {game.endGame(game.checkForDeath())}
        applyStatusChanges()
    },

    kickMove(playerLabel) {
        let kickObject = playerLabel.kick()
        let roll = (Math.random() * 100).toFixed(0)

        // Run Accuracy vs Roll
        switch (kickObject.acc > roll) {
            case true:
                console.log('Hit!')
                rival.hp.current = rival.hp.current - kickObject.dmg
                break
            
            case false:
                console.log("Miss!")
        }
        applyStatusChanges()
    },

    defendMove(playerLabel) {
        let defendObject = playerLabel.defend()
        playerLabel.energy.current = playerLabel.energy.current + defendObject.energyRegen
        applyStatusChanges()
    },

    specialMove(playerLabel) {
        let specialObject = playerLabel.special
        let roll = (Math.random() * 100).toFixed(0)
        player.energy.current = player.energy.current - specialObject.cost

        if (playerLabel.energy.current >= specialObject.cost) {
            // Run Accuracy vs Roll
            switch (specialObject.acc > roll) {
                case true:
                    console.log('Hit!')
                    rival.hp.current = rival.hp.current - specialObject.dmg
                    break
                
                case false:
                    console.log("Miss!")
            }
            applyStatusChanges()
        }
        else {
            let notification = document.createElement('div')
            notification.innerHTML = `<div>${player.name} does not have enough Energy for this move! Try defending to regain Energy!</div>`

            document.querySelector('.formContainer').append(notification)
            document.querySelector('.beginFightForm').classList.add('active')

            setTimeout(() => {
                document.querySelector('.formContainer').removeChild(document.querySelector('.formContainer').firstChild)
                document.querySelector('.beginFightForm').classList.remove('active')
            }, 3000)
        }
    }
}

createSceneElements()
addListeners()
introCountDown()