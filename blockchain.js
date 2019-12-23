const Block = require('./block')

class Blockchain {
  constructor () {
    this.chain = [this.createGenesisBlock()]
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
    this.chain.push(newBlock)
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
