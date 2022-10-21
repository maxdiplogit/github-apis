const { Octokit } = require('octokit');


const octokit = new Octokit({
    auth: `${ process.env.AUTH_TOKEN }`
});

// Utilities
const ExpressError = require('../utils/ExpressError');


const getOpenIssues = async (req, res, next) => {
    const queryParams = req.query;
    
    let response = {};

    if (queryParams.labels) {
        const labelsList = queryParams.labels.split(',');
        for (let i = 0; i < labelsList.length; i++) {
            if (labelsList[i].includes(" ")) {
                const regex = / /g;
                labelsList[i] = labelsList[i].replace(regex, "%20");
            }
        }
        const labels = labelsList.toString(',');
        console.log(labels, '\n');
        response = await octokit.request(`GET /repos/{owner}/{repo}/issues?labels=${ labels }`, {
            owner: `${ process.env.OWNER }`,
            repo: 'demo'
        });
        response.data.forEach(issue => {
            console.log(issue, '\n');
        });
    } else {
        response = await octokit.request(`GET /repos/{owner}/{repo}/issues`, {
            owner: `${ process.env.OWNER }`,
            repo: 'demo'
        });
        response.data.forEach(issue => {
            console.log(issue, '\n');
        });
    }
    
    res.json({ openIssuesCount: `${ response.data.length }`});
};

const getAllIssues = async (req, res, next) => {
    const queryParams = req.query;
    
    let response = {};

    if (queryParams.labels) {
        const labelsList = queryParams.labels.split(',');
        for (let i = 0; i < labelsList.length; i++) {
            if (labelsList[i].includes(" ")) {
                const regex = / /g;
                labelsList[i] = labelsList[i].replace(regex, "%20");
            }
        }
        const labels = labelsList.toString(',');
        console.log(labels, '\n');
        response = await octokit.request(`GET /repos/{owner}/{repo}/issues?state=all&labels=${ labels }`, {
            owner: `${ process.env.OWNER }`,
            repo: 'demo'
        });
    } else {
        response = await octokit.request(`GET /repos/{owner}/{repo}/issues?state=all`, {
            owner: `${ process.env.OWNER }`,
            repo: 'demo'
        });
        response.data.forEach(issue => {
            console.log(issue, '\n');
        });
    }
    
    res.json({ allIssuesCount: `${ response.data.length }`});
};

const getAssigneesIssues = async (req, res, next) => {
    const responseAssignees = await octokit.request(`GET /repos/{owner}/{repo}/assignees`, {
        owner: process.env.OWNER,
        repo: 'demo'
    });
    const assignees = {};
    responseAssignees.data.forEach(assignee => {
        if (!assignees[`${ assignee.login }`]) {
            assignees[`${ assignee.login }`] = 0
        }
    });
    
    const responseIssues = await octokit.request(`GET /repos/{owner}/{repo}/issues`, {
        owner: `${ process.env.OWNER }`,
        repo: 'demo'
    });
    
    responseIssues.data.forEach(issue => {
        // console.log(issue.assignees);
        if (issue.assignees.length !== 0) {
            issue.assignees.forEach((assignee) => {
                assignees[`${ assignee.login }`] += 1
            });
        }
    });
    // console.log('Assignees: ', assignees);
    
    res.json(assignees);
};


module.exports = { getOpenIssues, getAllIssues, getAssigneesIssues };