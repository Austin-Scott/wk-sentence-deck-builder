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

// Modals

const filterModal = 'filterModal'
const deckModal = 'deckModal'

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

function getNumberInputValue(elementId) {
    document.getElementById(elementId).value
}

function setNumberInputValue(elementId, value) {
    document.getElementById(elementId).value = value
}

function downloadStringAsCsvFile(title, text){
	const textToSave = text
	const hiddenElement = document.createElement('a')
	hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave)
	hiddenElement.target = '_blank'
	hiddenElement.download = title+'.csv'
	hiddenElement.click()
}

// Core functions

// {
//     jpSentence,
//     jpSentenceWithFurigana,
//     enTranslation1,
//     enTranslation2,
//     enTranslation3,
//     wordCount,
//     characterCount,
//     kanjiWaniKaniLevel,
//     vocabWaniKaniLevel,
//     maxKanjiAndVocabWaniKaniLevel,
//     waniKaniVocab,
//     source
// }
const sentences = []

function loadSentences() {
    return new Promise((resolve, reject) => {
        Papa.parse('https://austin-scott.github.io/wk-sentence-deck-builder/public/data/sentences-2024-04-06.csv', {
            download: true,
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

function loadFilterSettings() {
    const existingFilterSettings = localStorage.getItem('filterSettings')
    if(existingFilterSettings) {
        const filterSettings = JSON.parse(existingFilterSettings)

        setNumberInputValue(minWaniKaniLevel, filterSettings.minWaniKaniLevel || 0)
        setCheckboxValue(enableMinWaniKaniLevel, filterSettings.enableMinWaniKaniLevel)
        setNumberInputValue(maxWaniKaniLevel, filterSettings.maxWaniKaniLevel || 0)
        setCheckboxValue(enableMaxWaniKaniLevel, filterSettings.enableMaxWaniKaniLevel)

        setNumberInputValue(minWordCount, filterSettings.minWordCount || 0)
        setCheckboxValue(enableMinWordCount, filterSettings.enableMinWordCount)
        setNumberInputValue(maxWordCount, filterSettings.maxWordCount || 0)
        setCheckboxValue(enableMaxWordCount, filterSettings.enableMaxWordCount)

        setNumberInputValue(minCharacterCount, filterSettings.minCharacterCount || 0)
        setCheckboxValue(enableMinCharacterCount, filterSettings.enableMinCharacterCount)
        setNumberInputValue(maxCharacterCount, filterSettings.maxCharacterCount || 0)
        setCheckboxValue(enableMaxCharacterCount, filterSettings.enableMaxCharacterCount)

        refreshForm()
    }
}

function saveFilterSettings() {
    const filterSettings = {
        minWaniKaniLevel: getNumberInputValue(minWaniKaniLevel),
        enableMinWaniKaniLevel: getCheckboxValue(enableMinWaniKaniLevel),
        maxWaniKaniLevel: getNumberInputValue(maxWaniKaniLevel),
        enableMaxWaniKaniLevel: getCheckboxValue(enableMaxWaniKaniLevel),

        minWordCount: getNumberInputValue(minWordCount),
        enableMinWordCount: getCheckboxValue(enableMinWordCount),
        maxWordCount: getNumberInputValue(maxWordCount),
        enableMaxWordCount: getCheckboxValue(enableMaxWordCount),

        minCharacterCount: getNumberInputValue(minCharacterCount),
        enableMinCharacterCount: getCheckboxValue(enableMinCharacterCount),
        maxCharacterCount: getNumberInputValue(maxCharacterCount),
        enableMaxCharacterCount: getCheckboxValue(enableMaxCharacterCount)
    }
    localStorage.setItem('filterSettings', JSON.stringify(filterSettings))
}

const deck = []

function loadDeck() {
    const existingDeck = localStorage.getItem('deck')
    if(existingDeck) {
        deck.push(...JSON.parse(existingDeck))
    }
    setInnerHtml(deckCountElement, existingDeck.length)
}
function saveDeck() {
    localStorage.setItem('deck', JSON.stringify(deck))
}

window.onload = async function load() {
    await loadSentences()
    loadFilterSettings()
    runFilter()
    loadDeck()

    show(showDetailsButton)
    show(deckButton)
    show(filterButton)
}

function refreshForm() {
    document.getElementById('minWaniKaniLevel').disabled = !getCheckboxValue(enableMinWaniKaniLevel)
    document.getElementById('maxWaniKaniLevel').disabled = !getCheckboxValue(enableMaxWaniKaniLevel)
    document.getElementById('minWordCount').disabled = !getCheckboxValue(enableMinWordCount)
    document.getElementById('maxWordCount').disabled = !getCheckboxValue(enableMaxWordCount)
    document.getElementById('minCharacterCount').disabled = !getCheckboxValue(enableMinCharacterCount)
    document.getElementById('maxCharacterCount').disabled = !getCheckboxValue(enableMaxCharacterCount)
}

const filteredSentences = []
function runFilter() {
    saveFilterSettings()
    filteredSentences.splice(0, filteredSentences.length)
    filteredSentences.push(...sentences.filter(s => {
        if(getCheckboxValue(enableMinWaniKaniLevel)) {
            if(s.maxKanjiAndVocabWaniKaniLevel < getNumberInputValue(minWaniKaniLevel)) return false
        }
        if(getCheckboxValue(enableMaxWaniKaniLevel)) {
            if(s.maxKanjiAndVocabWaniKaniLevel > getNumberInputValue(maxWaniKaniLevel)) return false
        }

        if(getCheckboxValue(enableMinWordCount)) {
            if(s.wordCount < getNumberInputValue(minWordCount)) return false
        }
        if(getCheckboxValue(enableMaxWordCount)) {
            if(s.wordCount > getNumberInputValue(maxWordCount)) return false
        }

        if(getCheckboxValue(enableMinCharacterCount)) {
            if(s.characterCount < getNumberInputValue(minCharacterCount)) return false
        }
        if(getCheckboxValue(enableMaxCharacterCount)) {
            if(s.characterCount > getNumberInputValue(maxCharacterCount)) return false
        }

        return true
    }))
    setInnerHtml(sentenceCountElement, filteredSentences.length)
    bootstrap.Modal.getInstance(document.getElementById(filterModal)).hide()
    nextSentence()
}

let currentSentence = null
let isShowingFurigana = false
let currentTranslation = 1
function nextSentence() {
    if(filteredSentences.length > 0) {
        currentSentence = filteredSentences[Math.floor(Math.random() * filteredSentences.length)]
        setInnerHtml(jpSentenceElement, currentSentence.jpSentence)
        isShowingFurigana = false
        setInnerHtml(enSentenceElement, currentSentence.enTranslation1)
        currentTranslation = 1
        setInnerHtml(wkDetailsButton, `Level ${currentSentence.maxKanjiAndVocabWaniKaniLevel}`)
        // TODO: render WK details

        hide(jpSentenceElement)
        hide(altTranslationsButton)
        hide(wkDetailsButton)

        hide(addToDeckButton)
        hide(nextSentenceButton)
        show(showDetailsButton)
    }
}

function addCurrentSentenceToDeck() {
    if(currentSentence !== null) {
        deck.push(currentSentence)
        saveDeck()
    }
    setInnerHtml(deckCountElement, deck.length)
    nextSentence()
}

function showAllDetails() {
    show(enSentenceElement)
    setInnerHtml(jpSentenceElement, currentSentence.jpSentenceWithFurigana)
    isShowingFurigana = true
    if(currentSentence.enTranslation2 || currentSentence.enTranslation3) {
        show(altTranslationsButton)
    }
    show(wkDetailsButton)

    hide(showDetailsButton)
    show(addToDeckButton)
    show(nextSentenceButton)
}

function exportDeck() {

}

function clearDeck() {
    if(window.confirm('Are you sure you want to clear your deck?')) {

    }
}

function showAltTranslation() {
    currentTranslation += 1
    if(currentSentence.enTranslation3) {
        currentTranslation = currentTranslation % 3
    } else if(currentSentence.enTranslation2) {
        currentTranslation = currentTranslation % 2
    } else {
        currentTranslation = 0
    }
    if(currentTranslation == 2) {
        setInnerHtml(jpSentenceElement, currentSentence.enTranslation3)
    } else if(currentTranslation == 1) {
        setInnerHtml(jpSentenceElement, currentSentence.enTranslation2)
    } else {
        setInnerHtml(jpSentenceElement, currentSentence.enTranslation1)
    }
}
