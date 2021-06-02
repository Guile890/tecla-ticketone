const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['','']; // agregar end points de views

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./app.js')
})