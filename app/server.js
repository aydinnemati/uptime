const fastify = require('./app')
// const fastify = require('fastify')();
require('dotenv').config()

fastify.listen(process.env.server_port, process.env.server_addr, function (err, address) {
    if (err) {
      console.log(err)
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`Server is now listening on ${address}`)
  })

