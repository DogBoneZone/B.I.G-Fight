import { createCharacters } from './script.js'

// define characters
const player = createCharacters()[Number(sessionStorage.getItem('selectedCharacter'))]
const rival = createCharacters()[Number(sessionStorage.getItem('rivalCharacter'))]

function createSceneElements() {
    // let player = characters[Number(sessionStorage.getItem('selectedCharacter'))]
    // let rival = characters[Number(sessionStorage.getItem('rivalCharacter'))]

    // Create Player Status Bars
    let fighter1 = document.createElement('div')
    fighter1.innerHTML = ` <div>${player.name}</div>
                            <div class="hpMax">
                                <div id="playerHP" class="hpCurrent"></div>
                            </div>`

    let fighter2 = document.createElement('div')
    fighter2.innerHTML = ` <div>${rival.name}</div>
                            <div class="hpMax">
                                <div id="rivalHP" class="hpCurrent"></div>
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
        let proportion = (cha.hp.current / cha.hp.max) * 100

        switch (cha === player) {
            case true:
                document.querySelector('#playerHP').style.width = `${proportion}%`
                break
            
            case false: 
                document.querySelector('#rivalHP').style.width = `${proportion}%`
                break
        }
    }
}

// Add button listeners
function addListeners() {
    document.querySelector('#goToSelectScreen').addEventListener('click', () => {
        window.location.href = 'index.html'
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
        applyStatusChanges()
    },

    specialMove(playerLabel) {
        let specialObject = playerLabel.special
        let roll = (Math.random() * 100).toFixed(0)

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
}

createSceneElements()
addListeners()