clock.hypersource.club
======================

A simple HyperSource clock server

## Installation

```js
$ npm install -g clock.hypersource.club
```

## Usage

```sh
$ clock.hypersource.club --port 3000 --host '127.0.0.1'
```

or with `npx`

```sh
$ npx clock.hypersource.club --port 3000 --host '127.0.0.1'
```

clock a message with
[hypersource-client](https://github.com/jwerle/hypersource-client).

```sh
$ hsurl ws://clock.hypersource.club --live --output ./clock
```

or programmatically

```js
const hyperclock = require('hyperclock')
const ram = require('random-access-memory')
const client = require('hypersource-client')(hyperclock(ram), 'wss://clock.hypersource.club')
client.connect((err, res) => {
  res.createReadStream(({ live: true }).on('data', console.log)
})
```

which outputs

```
...
{ time: 1556405496684,
  random:
   <Buffer 6a 84 3d b4 18 0c 21 0f 7e 21 ec 13 21 3a c1 40 58 a9 05 0c d5 00 9d 27 ce 31 33 77 8d d5 95 1d> }
{ time: 1556405497683,
  random:
   <Buffer a5 80 8b 84 77 f7 61 9b 13 72 e9 f7 33 52 1e 62 27 e3 a7 4b 22 42 09 e5 06 e1 42 74 87 47 fd 47> }
...
```

## API

### `server = require('clock.hypersource.club')()`

Create a [hypersource](https://github.com/jwerle/hypersource) server

#### Example

```js
const server = require('clock.hypersource.club')()
server.listen(3000)
server.on('request', (req) => {
  console.log('%s %s', req.method, req.url)
})
```

## License

MIT
