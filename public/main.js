
// Utility

function show(elementId) {
    document.getElementById(elementId).classList.remove('d-none')
}

function hide(elementId) {
    document.getElementById(elementId).classList.add('d-none')
}

// Buttons

const showDetailsButton = 'showDetailsButton'
const addToDeckButton = 'addToDeckButton'
const nextSentenceButton = 'nextSentenceButton'

// Button handlers

function onShowAllDetails() {
    hide(showDetailsButton)
    show(addToDeckButton)
    show(addToDeckButton)
}

function onAddToDeck() {
    hide(addToDeckButton)
    hide(nextSentenceButton)
    show(showDetailsButton)
}

function onNextSentence() {
    hide(addToDeckButton)
    hide(nextSentenceButton)
    show(showDetailsButton)
}