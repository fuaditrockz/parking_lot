const fs = require('fs')
const readline = require('readline')
const fileInput = 'file_input.txt'

const readFileLineByLine = async () => {
  const fileReadInterface = await readline.createInterface({
    input: fs.createReadStream(fileInput)
  })

  return fileReadInterface.on('line', line => {
    if (line === 'create_parking_lot 6') console.log('Created parking lot with 6 slots')
    console.log(line)
  })
}

const parkingLot = () => {
  console.log('ALL OUTPUT HERE!')
  readFileLineByLine()
}

module.exports = parkingLot