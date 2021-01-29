const _ = {
    clamp(number, lower, upper) {
        const lowerClampedValue = Math.max(number, lower);
        const clampedValue = Math.min(lowerClampedValue, upper);
        return clampedValue;
    },
    inRange(number, start, end) {
        if (typeof end === undefined) {
            end = start;
            start = 0;
        }
        if (start > end) {
            const temp = start;
            start = end;
            end = temp;
        }
        const isInRange = (number < start) || (number >= end) ? false : true 
        return isInRange
    },
    words(str) {
        words = str.split(' ')
        return words
    },
    pad(str, len) {
        const diff = len - str.length
        if (diff <= 0) {
            return str
        }
        const startPaddingLength = Math.floor((len - str.length) / 2);
        const endPaddingLength = len - str.length - startPaddingLength;
        const paddedString = ' '.repeat(startPaddingLength) + str + ' '.repeat(endPaddingLength);
        return paddedString
    },
    has(object, key) {
        const hasValue = (object[key] !== undefined) ? true : false
        return hasValue
    },
    invert(object) {
        const invertedObject = {}
        for (const key in object) {
            invertedObject[object[key]] = key
        }
        return invertedObject
    },
    findKey(object, predicate) {
        for (const key in object) {
            const predicateResult = predicate(object[key])
            if (predicateResult === true) {
                return key
            }
        }
        return undefined
    },
    drop(array, n) {
        const droppedArray = array;
        let i = 0;
        do {
            droppedArray.shift()
            i++
        } while (i < n)
        return droppedArray
    },
    dropWhile(array, predicate) {
        const dropNumber = array.findIndex((el, index) => {
            return !predicate(el, index, array)
        });
        const droppedArray = this.drop(array, dropNumber)
        return droppedArray
    },
    chunk(array, size = 1) {
        const chunkedArray = [];
        const chunkTimes = Math.ceil(array.length / size);
        for (let i = 0; i < chunkTimes ; i++) {
            chunkedArray.push(array.splice(0, size))
        }
        return chunkedArray;
    },
}


// Do not write or modify code below this line.
module.exports = _;