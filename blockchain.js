const Block = require('./block')

class Blockchain {
  constructor () {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 4
  }

  createGenesisBlock () {
    const genesisDate = '22/12/2019'
    return new Block('Genesis Block', 0, genesisDate)
  }

  getLastBlock () {
    return this.chain[this.chain.length - 1]
  }

  addNewBlock (newBlock) {
    newBlock.index = this.getLastBlock().index + 1
    newBlock.hash = newBlock.calculateHash()
    newBlock.mineBlock(this.difficulty)
    this.chain.push(newBlock)
  }

  isChainValid () {
    const chain = this.chain

    for (let i = 0; i < chain.length; i++) {
      if (chain[i].hash !== chain[i].calculateHash()) {
        console.log(`Block ${i} has been corrupted`)
        return false
      }

      if (i > 0 && chain[i].previousHash !== chain[i - 1].hash) {
        console.log(`Block ${i - 1} has been corrupted`)
        return false
      }
    }

    console.log('Chain is valid')
    return true
  }
}

let blocksToAdd = 5

const PolyChain = new Blockchain()

for (i = 0; i < blocksToAdd; i++) {
  PolyChain.addNewBlock(new Block({
    sender: 'Gadgetboy',
    receiver: 'Youtube',
    message: `Block ${PolyChain.chain.length} has been added to the chain` }))
}

PolyChain.chain.forEach((block) => {
  console.log(block)
})
