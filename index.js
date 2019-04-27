const hypersource = require('hypersource')
const hyperclock = require('hyperclock')
const hypercore = require('hypercore')
const debug = require('debug')('clock.hypersource.club')
const ram = require('random-access-memory')

function createServer(opts) {
  if (!opts || 'object' !== typeof opts) {
    opts =  {}
  }

  const server = hypersource.createServer(onrequest)

  server.on('error', debug)

  return server

  function onrequest(req, res) {
    res.interval = opts.interval
    const source = hypercore(ram, req.key)
    const clock = hyperclock(ram, res.key, res)

    source.on('error', onerror)
    clock.on('error', onerror)

    req.on('error', onerror)
    res.on('error', onerror)

    source.replicate(req).once('handshake', onhandshake)

    function onhandshake() {
      clock.ready(() => {
        clock.replicate(res).on('close', onclose).on('end', onclose)
      })
    }

    function onclose() {
      clock.close()
      source.close()
    }

    function onerror(err) {
      debug(err)
    }
  }
}

module.exports = createServer
