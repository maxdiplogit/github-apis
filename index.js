if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const axios = require('axios');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');


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


// Setting view engine and 'views' directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.get('/', (req, res, next) => {
    res.send('GitHub APIs Implementation');
});

// Route to start the OAuth authentication process
app.get('/authorize', async (req, res, next) => {
    // const response = await axios.get(`https://github.com/login/oauth/authorize?client_id=${ process.env.CLIENT_ID }&scope=repo`);
    console.log('Authorize Route CLIENT_ID: ', process.env.CLIENT_ID);
    res.render('authorize', {
        client_id: process.env.CLIENT_ID
    });
});

// This callback will have a query parameter that will go by the name of 'code'
app.get('/callback', async (req, res, next) => {
    const { code } = req.query;
    console.log('Callback Route code: ', code);

    console.log('Callback Route CLIENT_ID: ', process.env.CLIENT_ID);
    console.log('Callback Route CLIENT_SECRET: ', process.env.CLIENT_SECRET);
    // Now we use the recieved code from the OAuth Server to get an access_token from the OAuth Server.
    const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${ process.env.CLIENT_ID }&client_secret=${ process.env.CLIENT_SECRET }&code=${ code }`);
    const arr = response.data.split('&');
    const access_token = arr[0].split('=')[1];
    
    process.env.AUTH_TOKEN = access_token;
    console.log(process.env.AUTH_TOKEN);

    res.send('It should have worked!');
});

app.use('/issues', issuesRouter);


app.listen(4500, () => {
    console.log('Listening on PORT 4500...');
});