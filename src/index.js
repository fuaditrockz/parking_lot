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
let totalParkingLots

const readFileLineByLine = () => {
  const fileReadInterface = readline.createInterface({
    input: fs.createReadStream(fileInput)
  })

  return fileReadInterface.on('line', line => {
    if (conditionType(line, 'create_parking_lot')) {
      const total = line.match(/\d+/)
      totalParkingLots = parseInt(total)
      console.log(`Created parking lot with ${total} slots`)
    }
    if (conditionType(line, TYPE_CONSTANTS.PARK)) {
      const carNumber = line.replace(TYPE_CONSTANTS.PARK + ' ', '')
      if (totalParkingLots < 1) {
        console.log('Sorry, parking lot is full')
      } else {
        parkedCar.push(carNumber)
        totalParkingLots = totalParkingLots - 1
        const carIndexPosition = parkedCar.findIndex(value => value === carNumber)
        console.log(`Allocated slot number: ${carIndexPosition + 1}`)
      }
    }
    if (conditionType(line, TYPE_CONSTANTS.LEAVE)) {
      const carNumber = () => {
        const removedTypeCommand = line.replace(TYPE_CONSTANTS.LEAVE + ' ', '')
        return removedTypeCommand.slice(0, -2)
      }
      const parkedHours = line.substr(line.length - 1)
      const totalCharge = (parkedHours - 2) * 10 + 10
      carIndexPosition = parkedCar.findIndex(value => value === carNumber())
      parkedCar.splice(carIndexPosition, 1)
      totalParkingLots = totalParkingLots + 1
      console.log(`Registration number ${carNumber()} with Slot Number ${carIndexPosition} is free with Charge ${totalCharge}`)
    }
  })
}

const parkingLot = () => {
  readFileLineByLine()
}

module.exports = parkingLot