const fs    = require('fs')
const Table = require('cli-table3')
const fileInput = 'file_input.txt'

const TYPE_CONSTANTS = {
  CREATE_LOT: 'create_parking_lot',
  PARK: 'park',
  LEAVE: 'leave',
  STATUS: 'status'
}

var table = new Table({
  head: ['Slot No.', 'Registration No.']
, colWidths: [10, 20]
});

const conditionType = (word, type) => {
  return word.includes(type)
}

let parkedCar = []
let totalParkingLots

// CREATE PARKING LOT
const createLot = data => {
  const total = parseInt(data.match(/\d+/))
  totalParkingLots = total
  console.log(`Created parking lot with ${total} slots`)
}

// PARKING CAR
const parking = data => {
  let parkingStatus

  const carNumber = data.replace(TYPE_CONSTANTS.PARK + ' ', '')
  const emptyLot = parkedCar.indexOf(null)
  const isUnavailableLot = emptyLot > -1

  if (totalParkingLots < 1) {
    parkingStatus = 'Sorry, parking lot is full'
  } else {
    isUnavailableLot ? parkedCar[emptyLot] = carNumber : parkedCar.push(carNumber)
    const carIndexPosition = parkedCar.findIndex(value => value === carNumber)
    const actualCarIndexPosition = carIndexPosition + 1

    totalParkingLots = totalParkingLots - 1
    isUnavailableLot ? table[emptyLot, emptyLot] = [actualCarIndexPosition, carNumber] : table.push([actualCarIndexPosition, carNumber])
    parkingStatus = `Allocated slot number: ${actualCarIndexPosition}`
  }

  console.log(parkingStatus)
}

// LEAVING CAR
const leaving = data => {
  let leavingStatus

  const carNumber = () => {
    const removedTypeCommand = data.replace(TYPE_CONSTANTS.LEAVE + ' ', '')
    return removedTypeCommand.slice(0, -2)
  }

  let carIndexPosition = parkedCar.findIndex(value => value === carNumber())
  let totalCharge

  if (carIndexPosition < 0) {
    leavingStatus = `Registration number ${carNumber()} with Slot Number not found`
  } else {
    const parkedHours = data.substr(data.length - 1)
    totalCharge = (parkedHours - 2) * 10 + 10
    parkedCar[carIndexPosition] = null
    carIndexPosition = carIndexPosition + 1

    table[carIndexPosition - 1] = [null, null]
    totalParkingLots = totalParkingLots + 1
    leavingStatus = `Registration number ${carNumber()} with Slot Number ${carIndexPosition} is free with Charge $${totalCharge}`
  }

  console.log(leavingStatus)
}

// PRINT STATUS
const status = () => {
  console.log(table.toString())
}

// FINAL OUTPUT
const parkingLotProjectOutput = () => {
  const convertFileIntoArray = fs.readFileSync(fileInput).toString().split("\n")

  convertFileIntoArray.map(data => {
    if (conditionType(data, TYPE_CONSTANTS.CREATE_LOT)) {
      createLot(data)
    }
    if (conditionType(data, TYPE_CONSTANTS.PARK) && !conditionType(data, TYPE_CONSTANTS.CREATE_LOT)) {
      parking(data)
    }
    if (conditionType(data, TYPE_CONSTANTS.LEAVE)) {
      leaving(data)
    }
    if (conditionType(data, TYPE_CONSTANTS.STATUS)) {
      status()
    }
  })
}

const parkingLot = async () => {
  parkingLotProjectOutput()
}

module.exports = parkingLot