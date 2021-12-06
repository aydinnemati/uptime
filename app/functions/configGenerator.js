const fs = require('fs'); 
const { Module } = require('module');
require('dotenv').config()

const hostsArray = [
    {
        'http': {
            'endpoint': 'google.com/robots.txt',
            'todo': 1,
            },
        'tcp': {
                'tcp_ip': '8.8.8.8',
                'tcp_port': '80',
                'todo': 0,
        },
        'dns': {
                'domain': 'google.com',
                'todo': 1,
            },
        'icmp': {
                'icmp_ip': '8.8.8.8',
                'todo': 0,
        }
    },
    {
        'http': {
            'endpoint': 'github.com/robots.txt',
            'todo': 1,
            },
        // 'tcp': {
        //         'tcp_ip': '1.1.1.1',
        //         'tcp_port': '80',
        //         'todo': 1,
        // },
        'dns': {
                'domain': 'github.com',
                'todo': 1,
            },
        'icmp': {
                'icmp_ip': '1.1.1.1',
                'todo': 1,
        }
    },
];

let configFileString = '';

const global_statics_lvl01 = `
global:
  scrape_interval: 15s
scrape_configs:
    `

function configGenerator(hostsArray) {
    ['icmp', 'dns', 'tcp', 'http'].forEach(BB_module => {
        const module_icmp_lvl01 = `
  - job_name: 'blackbox-${BB_module}'
    metrics_path: /probe
    params:
      module: [${BB_module}]
    static_configs:
      - targets:
`
    let modules_targets = ''

    hostsArray.forEach(host => {
        // console.log(host);
        // console.log(BB_module.todo == 1);
        // if (host[BB_module].todo == 1)
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
        replacement: 10.0.10.125:9115
`
    configFileString = configFileString+module_icmp_lvl01+modules_targets+module_icmp_lvl02;
    // const newConfig = global_statics_lvl01+configFileString
    })
console.log(global_statics_lvl01+configFileString)
return global_statics_lvl01+configFileString;
}
// configGenerator(hostsArray)

module.exports = configGenerator;