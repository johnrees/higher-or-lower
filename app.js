const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const suits = ["♥️","♠️","♣️","♦️"]

class Deck {
  constructor(cards) {
    this.cards = cards
  }

  shuffle() {
    for (let i = this.cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
    }
    return this
  }

  get pick() {
    const card = this.cards.pop()
    let options = []

    if (!card.highest && this.cards.some(c => c.val > card.val)) {
      options.push("HIGHER")
    }
    if (!card.lowest && this.cards.some(c => c.val < card.val)) {
      options.push("LOWER")
    }
    if (this.cards.filter(c => c.val === card.val).length > 1) {
      options.push("SAME")
    }

    return {
      card: card.label,
      options
    }
  }
}

class Card {
  constructor(number, suit, val, total) {
    this.number = number
    this.suit = suit
    this.val = val
    this.highest = (val === total.length-1)
    this.lowest = (val === 0)
  }

  get label() {
    return this.number + this.suit
  }
}

const flatten = arr => arr.reduce(
  (acc, val) => acc.concat(
    Array.isArray(val) ? flatten(val) : val
  ),
  []
)

const deck = new Deck(
  flatten(suits.map(s => (numbers.map((n, i, length) => new Card(n,s,i,length) ))))
)

while(deck.cards.length > 0) {
  console.log(deck.shuffle().pick)
}
