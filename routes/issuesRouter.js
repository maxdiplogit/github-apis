const express = require('express');


const router = express.Router();


const { getOpenIssues, getAllIssues, getAssigneesIssues } = require('../controllers/issuesController');


// Utilities
const catchAsync = require('../utils/catchAsync');


/**
 * @swagger
 * /issues/open:
 *  get:
 *      summary: Get Open Issues Count
 * 
 *      description: Gets all open issues from a specific repository. Accepts additional query parameters like labels.
 * 
 *      parameters:
 *          - in: query
 *            name: labels
 *            schema:
 *              type: string
 * 
 *      produces:
 *          - application/json
 * 
 *      responses:
 *          200:
 *              description: Fetched open issues count!
 *              scheme:
 *                  type: object
 *                  properties:
 *                      openIssuesCount:
 *                          type: number
 */
router.route('/open')
    .get(catchAsync(getOpenIssues));

/**
 * @swagger
 * /issues/all:
 *  get:
 *      summary: Get All Issues Count
 * 
 *      description: Gets all issues from a specific repository. Accepts additional query parameters like labels.
 * 
 *      parameters:
 *          - in: query
 *            name: labels
 *            schema:
 *              type: string
 * 
 *      produces:
 *          - application/json
 * 
 *      responses:
 *          200:
 *              description: Fetched all issues count!
 *              scheme:
 *                  type: object
 *                  properties:
 *                      allIssuesCount:
 *                          type: number
 */
router.route('/all')
    .get(catchAsync(getAllIssues));

/**
 * @swagger
 * /issues/assignees:
 *  get:
 *      summary: Get Assignees
 * 
 *      description: Gets all assignees from a specific repository and their respective issues count in that repository. Accepts no additional query parameters.
 * 
 *      produces:
 *          - application/json
 * 
 *      responses:
 *          200:
 *              description: Fetched assignees and thier respective issues count!
 *              scheme:
 *                  type: object
 *                  properties:
 *                      assignee:
 *                          type: number
 */
router.route('/assignees')
    .get(catchAsync(getAssigneesIssues));


module.exports = router;