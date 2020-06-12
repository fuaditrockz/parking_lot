const fs  = require('fs')
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

let parkedCar = []
let totalParkingLots

const parkingLotProjectOutput = () => {
  const convertFileIntoArray = fs.readFileSync(fileInput).toString().split("\n");
  convertFileIntoArray.map(data => {
    if (conditionType(data, TYPE_CONSTANTS.CREATE_LOT)) {
      const total = parseInt(data.match(/\d+/))
      totalParkingLots = total
      console.log(`Created parking lot with ${total} slots`)
    }
    if (conditionType(data, TYPE_CONSTANTS.PARK) && !conditionType(data, TYPE_CONSTANTS.CREATE_LOT)) {
      if (totalParkingLots < 1) {
        console.log('Sorry, parking lot is full')
      } else {
        const carNumber = data.replace(TYPE_CONSTANTS.PARK + ' ', '')
        const emptyLot = parkedCar.indexOf(null)
        emptyLot > -1 ? parkedCar[emptyLot] = carNumber : parkedCar.push(carNumber)
        totalParkingLots = totalParkingLots - 1
        const carIndexPosition = parkedCar.findIndex(value => value === carNumber)
        console.log(`Allocated slot number: ${carIndexPosition + 1}`)
        console.log(totalParkingLots)
      }
    }
    if (conditionType(data, TYPE_CONSTANTS.LEAVE)) {
      const carNumber = () => {
        const removedTypeCommand = data.replace(TYPE_CONSTANTS.LEAVE + ' ', '')
        return removedTypeCommand.slice(0, -2)
      }
      let carIndexPosition = parkedCar.findIndex(value => value === carNumber())
      let totalCharge
      if (carIndexPosition < 0) {
        carIndexPosition = 'not found'
        totalCharge = ''
      } else {
        totalParkingLots = totalParkingLots + 1
        const parkedHours = data.substr(data.length - 1)
        totalCharge = `is free with Charge $${(parkedHours - 2) * 10 + 10}`
        parkedCar[carIndexPosition] = null
      }
      console.log(`Registration number ${carNumber()} with Slot Number ${carIndexPosition} ${totalCharge}`)
    }
  })
}

const parkingLot = async () => {
  parkingLotProjectOutput()
}

module.exports = parkingLot