// returns new character objects
export function createCharacters() {
    class Fighter {
        constructor(data) {
            this.name = data.name
            this.img = data.img
            this.hp = {max: 10, current: 10}
            this.energy = {max: 10, current: 10}
            this.special = data.special,
            this.info = data.info
            this.card = `<h2>${data.name}</h2>
                        <img src="${data.img}">
                        <div class="characterInfo">${data.info}</div>`
        }
    
        punch() {
            return {dmg: 1, acc: 95}
        }
    
        kick() {
            return {dmg: 2, acc: 75}
        }

        defend() {
            return {defense: 2,  acc: 95, energyRegen: 3}
        }
    }

    // Fighter List Data
    const fighterList = [
        {
            name: 'Alex', 
            img: './images/fighters/parallel.jpg', 
            special: {name: 'Dragon Kick', dmg: 5, acc: 40, cost: 3},
            info: 'Alex can use Dragon Kick, a low accuracy but highly powerful attack.'
        },
    
        {
            name: 'Andrew', 
            img: './images/fighters/andrew-profile.gif', 
            special: {name: 'Flash Stomp', dmg: 3, acc: 65, cost: 5},
            info: 'Andrew can use a quick stomp attack for moderate damage and accuracy.'
        },
        
        {
            name: 'Colin', 
            img: './images/fighters/colin-profile.gif', 
            special: {name: 'Bio-Hack', dmg: 2, acc: 65, cost: 4},
            info: 'Colin initiates a hacking technique that allows him to deal damage over time.'
        },

        {
            name: 'Anthony', 
            img: './images/fighters/anthony-profile.gif', 
            special: {name: 'Magic Blast', dmg: 2, acc: 75, cost: 2},
            info: 'Anthony blasts a beam of magic toward his opponents.'
        }
    ]

    // Create Fighter Objects
    let fighterObjects = []
    for (let fighter of fighterList) {
        let newFighter = new Fighter(fighter)
        fighterObjects.push(newFighter)
    }
    return fighterObjects
}

// returns div element for fighter profile cards
function createFighterCards(fighters) {
    let fighterCards = []
    for (let fighter of fighters) {
        let card = document.createElement('div')
        card.classList.add('characterCard')
        card.id = `${(fighter.name).toLowerCase()}-card`
        card.dataset.activeIndex = fighters.indexOf(fighter)
        card.innerHTML = fighter.card
        fighterCards.push(card)
    }

    return fighterCards
}

// returns active fighter profile
function setCharacterCard(fighterCards, newIndex) {
    if (newIndex > fighterCards.length - 1) {newIndex = 0}
    else if (newIndex < 0) {newIndex = fighterCards.length - 1}

    let card = fighterCards[newIndex]
    if (document.querySelector('.fighterProfile') != null) {
        document.querySelector('.fighterProfile').append(card)
    }
}

// add listeners to buttons
function addListeners() {
    // fighter select buttons
    let selectBtns = [...document.querySelectorAll(".select")]

    for (let btn of selectBtns) {
        btn.addEventListener('click', () => {
            let currentIndex = Number(document.querySelector('.characterCard').dataset.activeIndex)
            let newIndex = btn.dataset.btnDirection == 'increase' ? currentIndex + 1 : currentIndex - 1
            setCharacterCard(createFighterCards(createCharacters()), newIndex)
            document.querySelector('.characterCard').remove()
        })
    }

    // Begin Fight Button
    if (document.querySelector('#beginFight') != null) {
        document.querySelector('#beginFight').addEventListener('click', () => {
            sessionStorage.setItem('selectedCharacter', document.querySelector('.characterCard').dataset.activeIndex)
            sessionStorage.setItem('rivalCharacter', Math.floor(Math.random() * createCharacters().length))

            switch (sessionStorage.getItem('selectedCharacter') === sessionStorage.getItem('rivalCharacter')) {
                case true:
                    sessionStorage.getItem('selectedCharacter') == 0 ? sessionStorage.setItem('rivalCharacter', Number(sessionStorage.getItem('selectedCharacter') + 1)) : sessionStorage.setItem('rivalCharacter', Number(sessionStorage.getItem('selectedCharacter') - 1))
                    break

                case false: 
                break
            }
            window.location = 'fight-page.html'
        })
    }

}

// execute functions
setCharacterCard(createFighterCards(createCharacters()), 0)
addListeners()