const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'BookWallet',
        version: '1.0.0',
        description: 'BookWallet'
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;