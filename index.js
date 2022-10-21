if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const issuesRouter = require('./routes/issuesRouter');


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'GitHub APIs Implementation',
            description: 'GitHub APIs Implementation',
            contact: {
                name: 'maxdiplo'
            },
            servers: [ 'http://localhost:4500' ]
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


const app = express();


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.get('/', (req, res, next) => {
    res.send('GitHub APIs Implementation');
});

app.use('/issues', issuesRouter);


app.listen(4500, () => {
    console.log('Listening on PORT 4500...');
});