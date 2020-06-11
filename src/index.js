const prompt = require('prompt')

prompt.start()

let data = []

const schema = {
  properties: {
    lot_available: {
      required: true,
      description: 'Lot Available'
    }
  }
}

const getParkingLotTotal = () => {
  prompt.get(schema, (err, result) => {
    if (err) return console.log(err)
    console.log(`create_parking_lot: ${result.lot_available}`)
  })
}

const parkingLot = () => {
  getParkingLotTotal()
}

module.exports = parkingLot