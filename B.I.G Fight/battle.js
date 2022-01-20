import { createCharacters } from './script.js'

// Return to Lobby Button
function addListeners() {
    document.querySelector('#goToSelectScreen').addEventListener('click', () => {
        window.location.href = 'index.html'
    })
}

function createPlayerStatusBar() {
    const characters = createCharacters()
    console.log(characters)
}


addListeners()
createPlayerStatusBar()