const fs = require('fs'); 
const { Module } = require('module');
require('dotenv').config()

const nodesarray = [
  {'node01': {
    'name': 'node01',
    'ip': '10.0.10.125',
    'port': '9115',
    }
  },
  {'node02': {
    'name': 'node02',
    'ip': '10.0.10.127',
    'port': '9115',
    }
  },
]

const hostsArray = [
    {
        'http': {
            'endpoint': 'google.com/robots.txt',
            },
        'tcp': {
                'tcp_ip': '8.8.8.8',
                'tcp_port': '80',
        },
        'dns': {
                'domain': 'google.com',
            },
        'icmp': {
                'icmp_ip': '8.8.8.8',
        }
    },
    {
        'http': {
            'endpoint': 'github.com/robots.txt',
            },
        // 'tcp': {
        //         'tcp_ip': '1.1.1.1',
        //         'tcp_port': '80',
        // },
        'dns': {
                'domain': 'github.com',
            },
        'icmp': {
                'icmp_ip': '1.1.1.1',
        }
    },
];

const reqObject = {
  'nodes': nodesarray,
  'hosts': hostsArray,
}


let configFileString = '';

const global_statics_lvl01 = `
global:
  scrape_interval: 15s
scrape_configs:
    `

function configGenerator(reqObject) {
  // console.log(reqObject.nodes)
  reqObject.nodes.forEach(node => {
    ['icmp', 'dns', 'tcp', 'http'].forEach(BB_module => {
        const module_icmp_lvl01 = `
  - job_name: 'blackbox-${BB_module}-${node.name}'
    metrics_path: /probe
    params:
      module: [${BB_module}]
    static_configs:
      - targets:
`
    let modules_targets = ''

    reqObject.hosts.forEach(host => {
        if (BB_module in host) {
        if (BB_module === 'icmp') {
        modules_targets = modules_targets+`
        - ${host.icmp.icmp_ip}`
        }
        if (BB_module === 'http') {
          modules_targets = modules_targets+`
        - ${host.http.endpoint}`
        }
        if (BB_module === 'dns') {
          modules_targets = modules_targets+`
        - ${host.dns.domain}`
        }
        if (BB_module === 'tcp') {
          modules_targets = modules_targets+`
        - ${host.tcp.tcp_ip}:${host.tcp.tcp_port}`
        }
      }
    });
    const module_icmp_lvl02 = `
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: ${BB_module}_lable
      - target_label: __address__
        replacement: ${node.ip}:${node.port}
`
    configFileString = configFileString+module_icmp_lvl01+modules_targets+module_icmp_lvl02;
    console.log(configFileString+"===========")
    })
})
// console.log(global_statics_lvl01+configFileString)
return global_statics_lvl01+configFileString;
}

configGenerator(reqObject)

module.exports = configGenerator;