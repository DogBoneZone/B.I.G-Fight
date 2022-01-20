// Create Fighter Objects

function createCharacters() {
    class Fighter {
        constructor(data) {
            this.name = data.name
            this.img = data.img
            this.hp = {max: 10, current: 10}
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
    }

    const fighterList = [
        {
            name: 'Alex H.', 
            img: './images/fighters/parallel.jpg', 
            special: {name: 'Dragon Kick', dmg: 5, acc: 40},
            info: 'Alex can use Dragon Kick, a low accuracy but highly powerful attack.'
        },
    
        {
            name: 'Andrew S.', 
            img: './images/fighters/parallel.jpg', 
            special: {name: 'Flash Stomp', dmg: 3, acc: 65},
            info: 'Andrew can use a quick stomp attack for moderate damage and accuracy.'
        }    
    ]

    let fighterObjects = []
    for (let fighter of fighterList) {
        let newFighter = new Fighter(fighter)
        fighterObjects.push(newFighter)
    }
    return fighterObjects
}



// Creates profile card div
// for (let fighter of fighterObjects) {
//     let card = document.createElement('div')
//     card.style.classList.add('characterCard')
//     card.innerHTML = fighter.card
// }