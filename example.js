const hypersource = require('hypersource-client')
const hyperclock = require('hyperclock')
const ram = require('random-access-memory')

const client = hypersource(hyperclock(ram), 'ws://localhost:3000')
client.connect((err, res) => {
  res.createReadStream({ live: true }).on('data', console.log)
})
