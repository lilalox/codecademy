// Returns a random index based on an array's length
const randIndex = (arr) => Math.floor(Math.random() * arr.length);

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[randIndex(dnaBases)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Makes P-Aequor objects
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const i = randIndex(dna)
      const mutatingBase = this.dna[i];
      const dnaBases = ['A', 'T', 'C', 'G'];
      let newBase;
      do {
        newBase = dnaBases[randIndex(dnaBases)]
      } while (newBase === mutatingBase)
      this.dna[i] = newBase
      //console.log(`Specimen ${specimenNum}'s DNA base at index ${i} has mutated from ${mutatingBase} to ${newBase}.`)
      return this.dna
    },
    compareDNA(otherSpecimen) {
      let sameDNA = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherSpecimen.dna[i]) {
          sameDNA++
        }
      }
      const dnaPercent = Math.ceil(sameDNA / this.dna.length * 100)
      //console.log(`Specimen #${this.specimenNum} and #${otherSpecimen.specimenNum} have ${dnaPercent}% DNA in common.`)
      return dnaPercent;
    },
    willLikelySurvive() {
      const goodBases = ['C', 'G'];
      let nrOfGoodBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (goodBases.includes(this.dna[i])) {
          nrOfGoodBases++
        }
      }
      const goodBasesPercent = Math.ceil(nrOfGoodBases / this.dna.length * 100);
      if (goodBasesPercent >= 60) {
        return true
      } else {
        return false
      }
    },
    complementStrand() {
      const complBases = [['A', 'T'], ['T', 'A'], ['C', 'G'], ['G', 'C']];
      const complDNA = [];
      for (let i = 0; i < this.dna.length; i++) {
        for (let j = 0; j < complBases.length; j++) {
          if (this.dna[i] === complBases[j][0]) {
            complDNA.push(complBases[j][1])
          }
        }
      }
      return complDNA;
    }
  }
}

// Finds a defined number of viable P-Aequors based on DNA characteristics
const makeViablePAequors = (num) => {
  const viablePAequors = [];
  const output = [];
  let i = 0;
  while (viablePAequors.length < num) {
    const newSpecimen = pAequorFactory(i, mockUpStrand());
    if (newSpecimen.willLikelySurvive()) {
      viablePAequors.push(newSpecimen)
      //console.log(`Specimen #${newSpecimen.specimenNum} was added to the array. ${viablePAequors.length}/${num}`)
      output.push('#' + newSpecimen.specimenNum)
    }
    i++;
  }
  console.log(`Viable P-Aequors (${num} total): ` + output.join(', '))
  return viablePAequors;
}

//Finds the two most related (DNA-wise) specimen in an array
const findMostRelated = (arr) => {
  const mostRelated = { specimen1: null, specimen2: null, percentage: 0 };
  for (let i = 0; i < arr.length; i++) {
    const compareArray = arr.slice()
    compareArray.splice(i, 1)
    for (let j = 0; j < compareArray.length; j++) {
      const percentage = arr[i].compareDNA(compareArray[j]);
      if (percentage > mostRelated.percentage) {
        mostRelated.specimen1 = arr[i]
        mostRelated.specimen2 = compareArray[j]
        mostRelated.percentage = percentage
      }
    }
  }
  console.log(`The most related specimen among the ${arr.length} analysed are #${mostRelated.specimen1.specimenNum} amd #${mostRelated.specimen2.specimenNum}, with ${mostRelated.percentage}% common DNA.`)
  return mostRelated;
}

const viable = makeViablePAequors(30);
findMostRelated(viable);

