const nodesModel = {
    type: 'array',
    items: {
        type: 'object',
        required: ['name','ip', 'port'],
        properties: {
            'name': {
                type: 'string',
                },
            'ip': {
                type: 'string',
                },
            'port': {
                type: 'string',
                },
            },
        }
    }
  
  module.exports = nodesModel;