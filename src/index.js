const fs = require('fs')
const readline = require('readline')
const fileInput = 'file_input.txt'

const TYPE_CONSTANTS = {
  CREATE_LOT: 'create_parking_lot',
  PARK: 'park',
  LEAVE: 'leave',
  STATUS: 'status'
}

const conditionType = (word, type) => {
  return word.includes(type)
}

const parkedCar = []

const readFileLineByLine = () => {
  const fileReadInterface = readline.createInterface({
    input: fs.createReadStream(fileInput)
  })

  return fileReadInterface.on('line', line => {
    if (conditionType(line, 'create_parking_lot')) {
      const total = line.match(/\d+/)
      console.log(`Created parking lot with ${total} slots`)
    }
    
  })
}

const parkingLot = () => {
  readFileLineByLine()
}

module.exports = parkingLot