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
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherSpecimen.dna[i]) {
          sameDNA++
        }
      }
      const dnaPercent = Math.ceil(sameDNA / this.dna.length * 100)
      console.log(`Specimen #${this.specimenNum} and #${otherSpecimen.specimenNum} have ${dnaPercent}% DNA in common.`)
    },
    willLikelySurvive() {
      const goodBases = ['C', 'G'];
      let nrOfGoodBases = 0;
      for (i = 0; i < this.dna.length; i++) {
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
    }
  }
}

const makeViablePAequors = (num) => {
  const viablePAequors = [];
  let i = 0;
  while (viablePAequors.length < num) {
    const newSpecimen = pAequorFactory(i, mockUpStrand());
    if (newSpecimen.willLikelySurvive()) {
      viablePAequors.push(newSpecimen)
      console.log(`Specimen #${newSpecimen.specimenNum} was added to the array. ${viablePAequors.length}/30`)
    }
    i++;
  }
  return viablePAequors;
}

console.log(makeViablePAequors(30));


