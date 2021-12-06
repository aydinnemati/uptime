const nodesModel = {
    type: 'array',
    items: {
        type: 'object',
        required: ['name','ip', 'port', 'enabled'],
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
            'enabled': {
                type: 'boolean',
                },
            },
        }
    }
  
  module.exports = nodesModel;