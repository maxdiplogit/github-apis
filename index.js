if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');
const { Octokit } = require('octokit');


const octokit = new Octokit({
    auth: `${ process.env.AUTH_TOKEN }`
});


const issuesRouter = require('./routes/issuesRouter');


const app = express();


app.get('/', (req, res, next) => {
    res.send('GitHub APIs Implementation');
});

app.use('/issues', issuesRouter);


app.listen(4500, () => {
    console.log('Listening on PORT 4500...');
});