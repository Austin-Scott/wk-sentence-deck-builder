
// Bottom answer buttons
const showDetailsButton = document.getElementById('showDetailsButton')
const addToDeckButton = document.getElementById('addToDeckButton')
const nextSentenceButton = document.getElementById('nextSentenceButton')

function showAllDetails() {
    showDetailsButton.classList.add('d-none')
    addToDeckButton.classList.remove('d-none')
    nextSentenceButton.classList.remove('d-none')
}

function addToDeck() {
    addToDeckButton.classList.add('d-none')
    nextSentenceButton.classList.add('d-none')
    showDetailsButton.classList.remove('d-none')
}

function nextSentence() {
    addToDeckButton.classList.add('d-none')
    nextSentenceButton.classList.add('d-none')
    showDetailsButton.classList.remove('d-none')
}