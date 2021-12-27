const fastify = require('fastify')();
const hostsModel = require('./models/hostsModel');
const nodesModel = require('./models/nodesModel');
const configGenerator = require('./functions/configGenerator');
const fs = require('fs');
// const {Docker} = require('node-docker-api');
// const docker = new Docker({ socketPath: '/var/run/docker.sock' });


const Dockerode = require('dockerode');
const DockerodeCompose = require('dockerode-compose');


require('dotenv').config()

const schema = {
  body: {
    'nodes': nodesModel,
    'hosts': hostsModel,
  }
}


// fastify.get('/', (req, reply) => {
//     reply.send(fs.readFileSync(process.env.current_config_file, err => {
//         if (err) {
//           console.error(err)
//           return
//         }
//     }))
// })

fastify.get('/test', (req, reply) => {
  reply.send('its good im here')
})

const docker = new Dockerode();
const container = docker.getContainer('prometheus');
const compose = new DockerodeCompose(docker, '/home/lucifer/Desktop/Hell/dockersss/prometheus/docker-compose.yml', 'poj-name');

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
          fs.rename(process.env.current_config_file, process.env.logged_config_file, async (err) => {
            if (err)
              throw err;
              fs.writeFile(process.env.current_config_file, newConfig, async (err) => {
                if (err) {
                  console.log(err);
                  throw err;
                }
                  await compose.pull();
                  let state = await compose.up();
                  console.log(state);
                  reply.send(newConfig);

              });
          });



      });
    });      

})

module.exports = fastify;