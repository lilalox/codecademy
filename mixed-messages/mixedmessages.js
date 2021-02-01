const content = {
    _subject: [],
    _relation: [],
    _formulation: [],
    _prediction: [],
    _timeframe: [],
    setterFx(text, key) {
        if (text instanceof Array) {
            text.forEach(el => key.push(el))
        } else if (text.includes(',')) {
            const textArray = text.split(',')
            textArray.forEach(el => key.push(el.trim()))
        } else {
            key.push(text)
        } 
    },
    get subject() {
        return this._subject
    },
    set subject(text) {
        this.setterFx(text, this.subject)
    },
    get relation() {
        return this._relation
    },
    set relation(text) {
        this.setterFx(text, this.relation)
    },
    get formulation() {
        return this._formulation
    },
    set formulation(text) {
        this.setterFx(text, this.formulation)
    },
    get prediction() {
        return this._prediction
    },
    set prediction(text) {
        this.setterFx(text, this.prediction)
    },
    get timeframe() {
        return this._timeframe
    },
    set timeframe(text) {
        this.setterFx(text, this.timeframe)
    },
    generateRandom(item) {
        const randIndex = Math.floor(Math.random() * item.length)
        return item[randIndex]
    },
    detectPlural(str) {
        if (/[\s]/g.test(str) && (str.charAt(str.length - 1) === 's')) {
            return 'are'
        } else {
            return 'is'
        }
    },
    capFirstLetter(str) {
        str = str.charAt(0).toUpperCase() + str.slice(1)
        return str
    },
    randomMessage() {
        const randomSub1 = this.generateRandom(this.subject);
        let randomSub2 = this.generateRandom(this.subject);
        while (randomSub1 === randomSub2) {
            randomSub2 = this.generateRandom(this.subject);
        };
        const randomRel= this.generateRandom(this.relation);
        const randomForm = this.generateRandom(this.formulation);
        const randomPred = this.generateRandom(this.prediction);
        const randomTime = this.generateRandom(this.timeframe);
        const isOrAre = this.detectPlural(randomSub1)

        console.log(`${this.capFirstLetter(randomSub1)} ${isOrAre} ${randomRel} ${randomSub2}. ${this.capFirstLetter(randomForm)} ${randomPred} ${randomTime}.`)
    }
}

content.subject = "the Moon, Jupiter's moon Io, Jupiter's moon Europe"
content.subject = "Mercury, Venus, Mars, Jupiter, Saturn, Neptune, Uranus, Pluto"
content.subject = "Jupiter's Moons, Saturn's Rings"
content.subject = "Orion's belt, the Sun, the Perseids"

content.relation = 'in alignment with, set opposite to, hiding behind, in the sector of'

content.formulation = 'you can expect, be prepared for, you should expect'
content.formulation = 'this will bring, this foreshadows'

content.prediction = 'a gloomy mood, some disasters, armaggedon'
content.prediction = 'a lot of great things, a joyful mood'

content.timeframe = `for the next ${Math.ceil(Math.random() * 9) + 1} years`
content.timeframe = 'today, this week, in the coming months, in the next few days'

content.randomMessage()