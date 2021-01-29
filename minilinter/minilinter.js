let unnecessaryWords = ['extremely', 'literally', 'actually' ];
let overusedWords = ['really', 'very', 'basically'];

// Create an object for every word
function createWord(word) {
    return {
        word,
        counter: 0
    }
}

// Create word object array: 
function createCounterArray(array = []) {
    const counterArray = [];
    
    for (let i = 0; i < array.length; i++) {
        counterArray.push(createWord(array[i]))
    }
    
    return counterArray;
}

// Remove any special characters and set to lowercase:
function formatWord(string) {
    let formattedWord = string.toLowerCase();
    formattedWord = formattedWord.replace(/[^a-zA-Z0-9]/g, "");
    return formattedWord;
}

// Remove unnecessary words:
function removeUnnecessaryWords(array) {
    const storyTrim = array.filter(
        word => {
            return !unnecessaryWords.includes(formatWord(word))
        }
    );
    return storyTrim
}
    
// Count overused words: 
function countOverusedWords(array) {
    const counterArray = createCounterArray(overusedWords);
    
    array.forEach(storyWord => {
        const i = counterArray.findIndex(el =>
            el.word === formatWord(storyWord)
        );

        if (overusedWords.includes(formatWord(storyWord))) {
            counterArray[i].counter += 1
        }
    })
        
    for (let i = 0; i < counterArray.length; i++) {
        console.log(`The word "${counterArray[i].word}" is used ${counterArray[i].counter} times.`)
    }
}
        
// Remove every other overused word:
function removeOverused(array) {
    const counterArray = createCounterArray(overusedWords);
    const betterStory = [];

    array.forEach(storyWord => {
        const i = counterArray.findIndex(el =>
            el.word === formatWord(storyWord)
        );

        if (!overusedWords.includes(formatWord(storyWord))) {
            betterStory.push(storyWord)
        } else if (counterArray[i].counter % 2 === 0) {
            betterStory.push(storyWord);
            counterArray[i].counter += 1
        } else {
            counterArray[i].counter += 1
        }
    })

    return betterStory;
}
            
// Find the words that appear the greatest number of times:
function mostFrequent(array) {
    const counterArray = createCounterArray()
    const excludeWords = ['the', 'i', 'a', 'to', 'an', '']
    
    array.forEach(word => { 
        const el = formatWord(word)
        const index = (word) => {
            return counterArray.findIndex(el =>
                el.word === formatWord(word)
            )
        }

        if (!excludeWords.includes(el)) {
            if (typeof counterArray[index(el)] === 'undefined') { //Checks if word doesn't already exist
                counterArray.push(createWord(el));
            }
            counterArray[index(el)].counter += 1
        }
    })

    const mostUsedWord = [{counter: 0}];
    let tieCounter = -1;

    counterArray.forEach(el => { 
        if (el.counter >= mostUsedWord[0].counter) {
            mostUsedWord.unshift(el);
        }
    })
    mostUsedWord.forEach(el => {
        if (el.counter === mostUsedWord[0].counter) {
            tieCounter += 1;
        }
    })
    
    if (tieCounter > 0) { // If two or more words are tied on the first place, create an array of all the tied words
        const tieArray = [`"${mostUsedWord[0].word}"`];
        for (let i = 1; i <= tieCounter; i++) {
            if (i === tieCounter) {
                tieArray.push(`and "${mostUsedWord[i].word}"`)
            } else {
                tieArray.push(`, "${mostUsedWord[i].word}"`)
            }
        }
        console.log(`The most used words are ${tieArray.join(' ')} (${mostUsedWord[0].counter} times).`)
        
    } else {
        console.log(`The most used word is "${mostUsedWord[0].word}" (${mostUsedWord[0].counter} times).`)
    }
}

// Count sentences in the paragraph:
function logProperties(array) {
    let sentenceCount = 0;
    const sentenceEnd = /[!?.]/;
    
    array.forEach(
        word => {
            if ( word.match(sentenceEnd)) {
                sentenceCount += 1
            }
        })
        
    if (sentenceCount === 0); {
        sentenceCount = 1
    }
        
    console.log(`This document contains ${sentenceCount} sentences and ${array.length} words.`)
}

// Live code below:
    
let story = `Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.`;
const storyArray = story.split(' ')

let storyTrim = removeUnnecessaryWords(storyArray);
console.log(storyTrim)

countOverusedWords(storyTrim);
storyTrim = removeOverused(storyTrim);
mostFrequent(storyTrim);
logProperties(storyTrim);