
// Bottom answer buttons
// const showDetailsButton = document.getElementById('showDetailsButton')
// const addToDeckButton = document.getElementById('addToDeckButton')
// const nextSentenceButton = document.getElementById('nextSentenceButton')


function showAllDetails() {
    (document.getElementById('showDetailsButton')).classList.add('d-none')
    (document.getElementById('addToDeckButton')).classList.remove('d-none')
    (document.getElementById('nextSentenceButton')).classList.remove('d-none')
}

function addToDeck() {
    (document.getElementById('addToDeckButton')).classList.add('d-none')
    (document.getElementById('nextSentenceButton')).classList.add('d-none')
    (document.getElementById('showDetailsButton')).classList.remove('d-none')
}

function nextSentence() {
    (document.getElementById('addToDeckButton')).classList.add('d-none')
    (document.getElementById('nextSentenceButton')).classList.add('d-none')
    (document.getElementById('showDetailsButton')).classList.remove('d-none')
}