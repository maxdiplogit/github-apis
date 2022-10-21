const express = require('express');


const router = express.Router();


const { getOpenIssues, getAllIssues, getAssigneesIssues } = require('../controllers/issuesController');


// Utilities
const catchAsync = require('../utils/catchAsync');


router.route('/open')
    .get(catchAsync(getOpenIssues));

router.route('/all')
    .get(catchAsync(getAllIssues));

router.route('/assignees')
    .get(catchAsync(getAssigneesIssues));


module.exports = router;