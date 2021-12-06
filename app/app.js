const fastify = require('fastify')();
const hostsArrayModel = require('./models/hostsModel');
const configGenerator = require('./functions/configGenerator');
const fs = require('fs');
const {Docker} = require('node-docker-api');
 
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

require('dotenv').config()

const schema = {
body: hostsArrayModel,
}


fastify.get('/', (req, reply) => {
    reply.send(fs.readFileSync(process.env.current_config_file, err => {
        if (err) {
          console.error(err)
          return
        }
    }))
})

fastify.get('/test', (req, reply) => {
    reply.send('its good im here')
})

fastify.post('/', { schema }, (req, reply) => {
    const newConfig = configGenerator(req.body);

    fs.rename( process.env.current_config_file, process.env.logged_config_file , async (err) => {
        if (err) throw err;
        // const newconfig = await configGenerator(req.body) //
        fs.writeFile(process.env.current_config_file, newConfig, err => {
        if (err) {
          console.error(err)
          return
            }
        docker.container.list()
           .then(containers => containers[0].restart()) // prometheus container must be the first
           .catch(error => console.log(error));
        })
    });
    reply.send(newConfig);
})

module.exports = fastify;