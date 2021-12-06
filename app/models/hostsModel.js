const hostsArrayModel = {
  type: 'array',
  items: {
      type: 'object',
    //   required: ['hostname','ip', 'dns', 'port'],
      properties: {
          'http': {
              type: 'object',
              properties: {
                  'endpoint': {
                      type: 'string',
                  },
              },
          },
          'tcp': {
              type: 'object',
              properties: {
                  'tcp-ip': {
                      type: 'string',
                  },
                  'tcp-port': {
                      type: 'string',
                  },
              },
          },
          'dns': {
              type: 'object',
              properties: {
                  'domain': {
                      type: 'string',
                  },
              },
          },
          'icmp': {
              type: 'object',
              properties: {
                  'icmp-ip': {
                      type: 'string',
                    },
                },
            }
        }
    }
}

module.exports = hostsArrayModel;