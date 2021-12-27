const fastify = require('fastify')();
const hostsModel = require('./models/hostsModel');
const nodesModel = require('./models/nodesModel');
const configGenerator = require('./functions/configGenerator');
const fs = require('fs');
const Dockerode = require('dockerode');
const DockerodeCompose = require('dockerode-compose');
const docker = new Dockerode();
const container = docker.getContainer(process.env.prometheus_container_name);
const compose = new DockerodeCompose(docker, process.env.prometheus_docker_compose_path, 'prometheus-docker-compose');

require('dotenv').config()

const schema = {
  body: {
    'nodes': nodesModel,
    'hosts': hostsModel,
  }
}

fastify.get('/test', (req, reply) => {
  console.log(newConfig)
  reply.send('its good im here')
})

fastify.post('/', { schema }, (req, reply) => {
  container.stop(function (err, data) {
    if (err) { 
      console.error(err);
        throw err;
    }
      console.log(data);
      container.remove(function (err, data) {
        if (err) { 
          console.error(err);
            throw err;
        }
          console.log(data);
          const newConfig = configGenerator(req.body);
          fs.writeFile(process.env.logged_config_file+Date.now(), newConfig, async (err) => {
            if (err) {
              throw err;
	          }
              fs.writeFile(process.env.current_config_file, newConfig, async (err) => {
                if (err) {
                  console.log(err);
                  throw err;
                }
                  let state = await compose.up();
                  console.log(state);
                  reply.send(newConfig);
              });
          });
      });
    });      
})

module.exports = fastify;
