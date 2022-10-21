# Github APIs Implementation
\
This application fetches all issues of a specific repository using **[GitHub APIs](https://docs.github.com/en/rest/issues)**.
\
Following are the functions achieved by this application:
- `/issues/open` lists all open issues in a specified repository with an only additional query parameter, `labels`. For example: `/issues/open?labels=good first issue,bug`.
- `/issues/all` lists all issues in a specified repository with an only additional query parameter, `labels`. For example: `/issues/all?labels=good first issue,bug`.
- `/issues/assignees` lists all assignees and their issues count in a specific repository with no additional query parameters.