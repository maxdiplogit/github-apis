const express = require('express');


const app = express();


app.get('/', (req, res, next) => {
    res.send('Github APIs Implementation');
});


app.listen(4500, () => {
    console.log('Listening on PORT 4500...');
});