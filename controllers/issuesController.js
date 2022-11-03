const { Octokit } = require('octokit');


// const octokit = new Octokit({
//     auth: process.env.AUTH_TOKEN
// });

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
        const octokit = new Octokit({
            auth: process.env.AUTH_TOKEN
        });
        response = await octokit.request(`GET /repos/{owner}/{repo}/issues?labels=${ labels }`, {
            owner: `${ process.env.OWNER }`,
            repo: 'Onboarding-phase'
        });
        response.data.forEach(issue => {
            console.log(issue, '\n');
        });
    } else {
        const octokit = new Octokit({
            auth: process.env.AUTH_TOKEN
        });
        response = await octokit.request(`GET /repos/{owner}/{repo}/issues`, {
            owner: `${ process.env.OWNER }`,
            repo: 'Onboarding-phase'
        });
        response.data.forEach(issue => {
            console.log(issue, '\n');
        });
    }
    
    res.status(200).json({ openIssuesCount: `${ response.data.length }`});
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
        const octokit = new Octokit({
            auth: process.env.AUTH_TOKEN
        });
        response = await octokit.request(`GET /repos/{owner}/{repo}/issues?state=all&labels=${ labels }`, {
            owner: `${ process.env.OWNER }`,
            repo: 'Onboarding-phase'
        });
    } else {
        const octokit = new Octokit({
            auth: process.env.AUTH_TOKEN
        });
        response = await octokit.request(`GET /repos/{owner}/{repo}/issues?state=all`, {
            owner: `${ process.env.OWNER }`,
            repo: 'Onboarding-phase'
        });
        response.data.forEach(issue => {
            console.log(issue, '\n');
        });
    }
    
    res.status(200).json({ allIssuesCount: `${ response.data.length }`});
};

const getAssigneesIssues = async (req, res, next) => {
    const octokit = new Octokit({
        auth: process.env.AUTH_TOKEN
    });
    
    const responseAssignees = await octokit.request(`GET /repos/{owner}/{repo}/assignees`, {
        owner: process.env.OWNER,
        repo: 'Onboarding-phase'
    });
    const assignees = {};
    responseAssignees.data.forEach(assignee => {
        if (!assignees[`${ assignee.login }`]) {
            assignees[`${ assignee.login }`] = 0
        }
    });
    
    const responseIssues = await octokit.request(`GET /repos/{owner}/{repo}/issues`, {
        owner: `${ process.env.OWNER }`,
        repo: 'Onboarding-phase'
    });
    
    responseIssues.data.forEach(issue => {
        // console.log(issue.assignees);
        if (issue.assignees.length !== 0) {
            issue.assignees.forEach((assignee) => {
                assignees[`${ assignee.login }`] += 1
            });
        }
    });
    console.log('Assignees: ', assignees);
    
    res.status(200).json(assignees);
};


module.exports = { getOpenIssues, getAllIssues, getAssigneesIssues };