// Buttons

const showDetailsButton = 'showDetailsButton'
const addToDeckButton = 'addToDeckButton'
const nextSentenceButton = 'nextSentenceButton'

const exportDeckButton = 'exportDeckButton'
const clearDeckButton = 'clearDeckButton'

const runFilterButton = 'runFilterButton'

const deckButton = 'deckButton'
const filterButton = 'filterButton'

const altTranslationsButton = 'altTranslationsButton'
const wkDetailsButton = 'wkDetailsButton'

// Text elements

const sentenceCountElement = 'sentenceCountElement'
const deckCountElement = 'deckCountElement'
const jpSentenceElement = 'jpSentenceElement'
const enSentenceElement = 'enSentenceElement'
const wkDetailsElement = 'wkDetailsElement'

// Filter form inputs

const minWaniKaniLevel = 'minWaniKaniLevel'
const enableMinWaniKaniLevel = 'enableMinWaniKaniLevel'

const maxWaniKaniLevel = 'maxWaniKaniLevel'
const enableMaxWaniKaniLevel = 'enableMaxWaniKaniLevel'

const minWordCount = 'minWordCount'
const enableMinWordCount = 'enableMinWordCount'

const maxWordCount = 'maxWordCount'
const enableMaxWordCount = 'enableMaxWordCount'

const minCharacterCount = 'minCharacterCount'
const enableMinCharacterCount = 'enableMinCharacterCount'

const maxCharacterCount = 'maxCharacterCount'
const enableMaxCharacterCount = 'enableMaxCharacterCount'


// Utility

function show(elementId) {
    document.getElementById(elementId).classList.remove('d-none')
}

function hide(elementId) {
    document.getElementById(elementId).classList.add('d-none')
}

function setInnerHtml(elementId, innerHtml) {
    document.getElementById(elementId).innerHTML = innerHtml
}

function getCheckboxValue(elementId) {
    document.getElementById(elementId).checked
}

function setCheckboxValue(elementId, checked) {
    document.getElementById(elementId).checked = checked
}

// Core functions

const sentences = []

function loadSentences() {
    return new Promise((resolve, reject) => {
        Papa.parse('data/sentences-2024-04-06.csv', {
            download: true,
            worker: true,
            header: true,
            step: function(row) {
                sentences.push(row.data)
            },
            complete: function() {
                resolve()
            }
        })
    })
}

window.onload = async function load() {
    await loadSentences()
    console.log(sentences)
}

function refreshForm() {
    document.getElementById('minWaniKaniLevel').disabled = !getCheckboxValue(enableMinWaniKaniLevel)
    document.getElementById('maxWaniKaniLevel').disabled = !getCheckboxValue(enableMaxWaniKaniLevel)
    document.getElementById('minWordCount').disabled = !getCheckboxValue(enableMinWordCount)
    document.getElementById('maxWordCount').disabled = !getCheckboxValue(enableMaxWordCount)
    document.getElementById('minCharacterCount').disabled = !getCheckboxValue(enableMinCharacterCount)
    document.getElementById('maxCharacterCount').disabled = !getCheckboxValue(enableMaxCharacterCount)
}

function runFilter() {

}

function addCurrentSentenceToDeck() {

}

function showAllDetails() {

}

function nextSentence() {

}

function loadDeck() {

}

function exportDeck() {

}

function clearDeck() {
    if(window.confirm('Are you sure you want to clear your deck?')) {

    }
}

function showAltTranslation() {

}
