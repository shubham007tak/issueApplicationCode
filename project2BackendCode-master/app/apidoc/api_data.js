define({ "api": [
  {
    "group": "comment",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/comment/allComments/:userId",
    "title": "api to fetch all comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the user (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"all comments found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"commentId\": \"ZWSLznPfN\",\n            \"createdBy\": \"ajnaj nknkn\",\n            \"createdByEmail\": \"bgm29484@cndps.com\",\n            \"createdById\": \"ZeLfckGTd\",\n            \"comment\": \"issue is general\",\n            \"createdForIssueId\": \"3oPYTsFoF\",\n            \"createdOn\": \"2019-02-06T10:32:46.000Z\"\n        },\n        {\n            \"commentId\": \"NHxbqHVCo\",\n            \"createdBy\": \"ajnaj nknkn\",\n            \"createdByEmail\": \"bgm29484@cndps.com\",\n            \"createdById\": \"ZeLfckGTd\",\n            \"comment\": \"issue found\",\n            \"createdForIssueId\": \"3oPYTsFoF\",\n            \"createdOn\": \"2019-02-06T10:52:08.000Z\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/CommentRoutes.js",
    "groupTitle": "comment",
    "name": "GetApiV1CommentAllcommentsUserid"
  },
  {
    "group": "comment",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/comment/getCommentOnClick",
    "title": "api to get all comments of a particular user on Click as user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the user (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue Id of issue (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"comments found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5c5ab7cec6ccf90cb86cca9d\",\n            \"commentId\": \"ZWSLznPfN\",\n            \"createdBy\": \"ajnaj nknkn\",\n            \"createdByEmail\": \"bgm29484@cndps.com\",\n            \"createdById\": \"ZeLfckGTd\",\n            \"comment\": \"issue\",\n            \"createdForIssueId\": \"3oPYTsFoF\",\n            \"createdOn\": \"2019-02-06T10:32:46.000Z\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5c5abc58c6ccf90cb86ccaa4\",\n            \"commentId\": \"NHxbqHVCo\",\n            \"createdBy\": \"ajnaj nknkn\",\n            \"createdByEmail\": \"bgm29484@cndps.com\",\n            \"createdById\": \"ZeLfckGTd\",\n            \"comment\": \"comment is there\",\n            \"createdForIssueId\": \"3oPYTsFoF\",\n            \"createdOn\": \"2019-02-06T10:52:08.000Z\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/CommentRoutes.js",
    "groupTitle": "comment",
    "name": "GetApiV1CommentGetcommentonclick"
  },
  {
    "group": "comment",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/comment/createComment",
    "title": "api to add comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Name of the user who created comment (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdByEmail",
            "description": "<p>Email of the user who created the comment (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdById",
            "description": "<p>ID of the user who created the comment (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdForIssueId",
            "description": "<p>IssueId of the Issue for whom the comment was created (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token(body param/header/query param) of the user who created comment (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n     \"error\": false,\n     \"message\": \"comment created\",\n     \"status\": 200,\n     \"data\": {\n            \"createdBy\": \"vaibhav tak\"\n            \"createdByEmail\": \"vaibhav.tak@xyz.com\"\n            \"createdById\": \"-zGtGVXTk\"\n            \"createdForIssueId\": \"Ca5l4Agsd\"\n            \"createdOn\": \"2019-01-16T18:45:45.000Z\"\n            \"commentId\": \"jPOLNs4gd\"\n            \"comment\": \"Comment1\"\n            \"__v\": 0\n            \"_id\": \"5c3f7bd9fdf17d172c3d9e47\"\n \n      } \n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/CommentRoutes.js",
    "groupTitle": "comment",
    "name": "PostApiV1CommentCreatecomment"
  },
  {
    "group": "comment",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/comment/deleteComment/:commentId",
    "title": "api to delete comment by user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "commentId",
            "description": "<p>Comment Id of the comment which is to be deleted</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"comment was successfully deleted\",\n    \"status\": 200,\n    \"data\": {\n        \"commentId\": \"NHxbqHVCo\",\n        \"createdBy\": \"aman garg\",\n        \"createdByEmail\": \"bgm29484@cndps.com\",\n        \"createdById\": \"ZeLfckGTd\",\n        \"comment\": \"comment\",\n        \"createdForIssueId\": \"3oPYTsFoF\",\n        \"createdOn\": \"2019-02-06T10:52:08.000Z\",\n        \"_id\": \"5c5abc58c6ccf90cb86ccaa4\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/CommentRoutes.js",
    "groupTitle": "comment",
    "name": "PostApiV1CommentDeletecommentCommentid"
  },
  {
    "group": "comment",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/comment/updateComment/:commentId",
    "title": "api to update comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Name of the user who created comment (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdByEmail",
            "description": "<p>Email of the user who created the comment (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdById",
            "description": "<p>ID of the user who created the comment (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdForIssueId",
            "description": "<p>IssueId of the Issue for whom the comment was created (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token(body param/header/query param) of the user who created comment (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"updated successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 0,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/CommentRoutes.js",
    "groupTitle": "comment",
    "name": "PutApiV1CommentUpdatecommentCommentid"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/allIssues",
    "title": "api to fetch all issues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the Person (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"all issues found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"issueId\": \"z_ujPe9B5\",\n            \"title\": \"def\",\n            \"fullNameCreatedFor\": \"aman garg\",\n            \"status\": \"Backlog\",\n            \"createdBy\": \"vaibhav tak\",\n            \"createdByEmail\": \"vaibhav.tak@xyz.com\",\n            \"createdById\": \"GeT-ZbwOx\",\n            \"description\": \"def\",\n            \"attachment\": \"1549826628192.user.png\",\n            \"createdForEmail\": \"aman.garg@xyz.com\",\n            \"createdFor\": \"461gu6f9v\",\n            \"createdOn\": \"2019-02-10T19:23:50.000Z\"\n        },\n        {\n            \"issueId\": \"jMchMYCHw\",\n            \"title\": \"Issue1\",\n            \"fullNameCreatedFor\": \"vaibhav tak\",\n            \"status\": \"Backlog\",\n            \"createdBy\": \"manish kumar\",\n            \"createdByEmail\": \"manish.kumar@xyz.com\",\n            \"createdById\": \"Nz5ZbDvTj\",\n            \"description\": \"<b>Issue1 description</b>\",\n            \"attachment\": \"1549915486758.user.png\",\n            \"createdForEmail\": \"vaibhav.tak@xyz.com\",\n            \"createdFor\": \"461gu6f9v\",\n            \"createdOn\": \"2019-02-11T20:04:48.000Z\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueAllissues"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/getNormalIssues/:userId",
    "title": "api to fetch all issues of Person",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the Person (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id of Person (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"issues found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5c607a46ce34cb1504c5a32c\",\n            \"issueId\": \"z_ujPe9B5\",\n            \"title\": \"issue\",\n            \"fullNameCreatedFor\": \"aman garg\",\n            \"status\": \"Backlog\",\n            \"createdBy\": \"vaibhav tak\",\n            \"createdByEmail\": \"vaibhav.tak@xyz.com\",\n            \"createdById\": \"GeT-ZbwOx\",\n            \"description\": \"in code\",\n            \"attachment\": \"1549826628192.user.png\",\n            \"createdForEmail\": \"aman.garg@xyz.com\",\n            \"createdFor\": \"461gu6f9v\",\n            \"createdOn\": \"2019-02-10T19:23:50.000Z\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5c607f2ace34cb1504c5a32f\",\n            \"issueId\": \"6oKLyF3Gm\",\n            \"title\": \"Issue2\",\n            \"fullNameCreatedFor\": \"aman garg\",\n            \"status\": \"Backlog\",\n            \"createdBy\": \"vaibhav tak\",\n            \"createdByEmail\": \"vaibhav.tak@xyz.com\",\n            \"createdById\": \"GeT-ZbwOx\",\n            \"description\": \"found\",\n            \"attachment\": \"1549827880270.user.png\",\n            \"createdForEmail\": \"aman.garg@xyz.com\",\n            \"createdFor\": \"461gu6f9v\",\n            \"createdOn\": \"2019-02-10T19:44:42.000Z\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueGetnormalissuesUserid"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issue/getSingleIssue/:issueId",
    "title": "api to get selected issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the Person (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue ID of the issue (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Issue Found\",\n    \"status\": 200,\n    \"data\": {\n            \"_id\": \"5c607a46ce34cb1504c5a32c\",\n            \"issueId\": \"z_ujPe9B5\",\n            \"title\": \"Issue\",\n            \"fullNameCreatedFor\": \"aman garg\",\n            \"status\": \"Backlog\",\n            \"createdBy\": \"vaibhav tak\",\n            \"createdByEmail\": \"vaibhav.tak@xyz.com\",\n            \"createdById\": \"GeT-ZbwOx\",\n            \"description\": \"Issue1\",\n            \"attachment\": \"1549826628192.user.png\",\n            \"createdForEmail\": \"aman.garg@xyz.com\",\n            \"createdFor\": \"461gu6f9v\",\n            \"createdOn\": \"2019-02-10T19:23:50.000Z\",\n            \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "GetApiV1IssueGetsingleissueIssueid"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/issue/createIssue",
    "title": "api to add issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Name of the Person who reported issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdByEmail",
            "description": "<p>Email of the Person who Reported the issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdById",
            "description": "<p>ID of the Person who created the issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdFor",
            "description": "<p>ID of the Person to whom the issue is assigned (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdForEmail",
            "description": "<p>Email of the Person to whom the issue is assigned (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "fullNameCreatedFor",
            "description": "<p>Full name of the Person to whom the issue is assigned (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of the  issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "attachment",
            "description": "<p>File Name of the issue Screenshot (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token(body param/header/query param) of the Person who created issue (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n     \"error\": false,\n     \"message\": \"issue created\",\n     \"status\": 200,\n     \"data\": {\n            \"createdBy\": \"vaibhav tak\"\n            \"createdByEmail\": \"vaibhav.tak@xyz.com\"\n            \"createdById\": \"-zGtGVXTk\"\n            \"createdFor\": \"3zclPt-r7\"\n            \"createdForEmail\": \"aman.garg@xyz.com\"\n            \"fullNameCreatedFor\": \"aman garg\"\n            \"createdOn\": \"2019-02-12T18:45:45.000Z\"\n            \"attachment\": \"1549719315834.user.png\"\n            \"status\": \"backlog\"\n            \"issueId\": \"jPOLNs4gd\"\n            \"description\": \"issue in command\"\n            \"title\": \"Issue1\"\n            \"__v\": 0\n            \"_id\": \"5c3f7bd9fdf17d172c3d9e47\"\n \n      } \n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "PostApiV1IssueCreateissue"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/issue/deleteIssue/:issueId",
    "title": "api to delete issue by Person",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>Issue Id of the issue which is to be deleted</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of the Person</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"issue was successfully deleted\",\n    \"status\": 200,\n    \"data\": {\n        \"issueId\": \"Ca5l4Agsd\",\n        \"title\": \"ijk\",\n        \"fullNameCreatedFor\": \"aman garg\",\n        \"status\": \"Backlog\",\n        \"createdBy\": \"vaibhav tak\",\n        \"createdByEmail\": \"vaibhav.tak@xyz.com\",\n        \"createdById\": \"GeT-ZbwOx\",\n        \"description\": \"ijk\",\n        \"attachment\": \"1549827908686.user.png\",\n        \"createdForEmail\": \"aman.garg@xyz.com\",\n        \"createdFor\": \"461gu6f9v\",\n        \"createdOn\": \"2019-02-10T19:45:11.000Z\",\n        \"_id\": \"5c607f47ce34cb1504c5a330\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "PostApiV1IssueDeleteissueIssueid"
  },
  {
    "group": "issue",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/issue/updateIssue/:issueId",
    "title": "api to update issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Name of the Person who reported issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdByEmail",
            "description": "<p>Email of the Person who Reported the issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdById",
            "description": "<p>ID of the Person who created the issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdFor",
            "description": "<p>ID of the Person to whom the issue is assigned (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdForEmail",
            "description": "<p>Email of the Person to whom the issue is assigned (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "fullNameCreatedFor",
            "description": "<p>Full name of the Person to whom the issue is assigned (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>status of the  issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the issue (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "attachment",
            "description": "<p>File Name of the issue Screenshot (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token(body param/header/query param) of the Person who created issue (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"updated successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 0,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/IssueRoutes.js",
    "groupTitle": "issue",
    "name": "PutApiV1IssueUpdateissueIssueid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "api to get all users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params/body params/header)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"All User Details Found\",\n      \"status\": 200,\n      \"data\": [\n          {\n            \"userId\": \"u-JSLXVEh\",\n            \"firstName\": \"virat\",\n            \"lastName\": \"rohit\",\n            \"fullName\": \"virat rohit\",\n            \"mobileNumber\": 1234567890,\n            \"password\": \"$2a$10$I/mOPRhahQxxybdQIDFxLO0yNxLjg6hiVjjhnNRoRO6SwFspas4Ri\",\n            \"createdOn\": \"2019-01-15T09:28:19.000Z\",\n            \"userName\": \"sharma\",\n            \"email\": \"rohit.sharma@xyz.com\",\n            \"countryName\": \"IN\",\n            \"countryCode\": 91\n          },\n          {\n            \"userId\": \"MVJIQYRZK\",\n            \"firstName\": \"anil\",\n            \"lastName\": \"rana\",\n            \"fullName\": \"anil rana\"\n            \"mobileNumber\": 1234567890,\n            \"password\": \"$2a$10$zItkcA5uAaO/SiAHe5hkLelizdlvLj/66AoVzx8XfiLRqWdSOvj5y\",\n            \"createdOn\": \"2019-01-14T18:45:06.000Z\",\n            \"userName\": \"anil-admin\",\n            \"email\": \"anil.rana@xyz.com\",\n            \"countryName\": \"IN\",\n            \"countryCode\": 91\n          }\n      ]\n  }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "api to delete a user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of the user. (query params/body params/header)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id of the user (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"Deleted the user successfully\",\n      \"status\": 200,\n      \"data\": [\n          {\n            \"userId\": \"u-JSLXVEh\",\n            \"firstName\": \"virat\",\n            \"lastName\": \"rohit\", \n            \"fullName\": \"virat rohit\",   \n            \"mobileNumber\": 1234567890,\n            \"password\": \"$2a$10$I/mOPRhahQxxybdQIDFxLO0yNxLjg6hiVjjhnNRoRO6SwFspas4Ri\",\n            \"createdOn\": \"2019-01-15T09:28:19.000Z\",\n            \"_id\": \"5c3da7b3cf9e321178b71f3d\",\n            \"userName\": \"sharma\",\n            \"email\": \"rohit.sharma@xyz.com\",\n            \"countryName\": \"IN\",\n           \"countryCode\": 91,\n            \"__v\": 0\n          }\n      ]\n  }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "type": "get",
    "url": "/api/v1/users/view/:userId",
    "title": "Get a single user",
    "version": "0.0.1",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The userId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"User Details Found\",\n\t    \"status\": 200,\n\t    \"data\": {\n\t    \t\t\t\"userId\": \"MVJIQYRZK\",\n                    \"firstName\": \"anil\",\n                    \"lastName\": \"rana\",\n                    \"fullName\": \"anil rana\"\n                    \"mobileNumber\": 1234567890,\n                    \"createdOn\": \"2019-01-14T18:45:06.000Z\",\n                    \"userName\": \"anil-admin\",\n                    \"email\": \"anil.rana@xyz.com\",\n                    \"countryName\": \"IN\",    \n                    \"countryCode\": 91\n\t\t\t\t}\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"No User Found\",\n\t    \"status\": 404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersViewUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "api to send link for resetting the password",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"email send successfully for password reset\",\n      \"status\": 200,\n      \"data\": {\n          \"error\": false,\n          \"message\": \"Email sent successfully to reset the password\",\n          \"status\": 200,\n          \"data\": \"email sent\"\n      }\n  }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"Login Successful\",\n      \"status\": 200,\n      \"data\": {\n          \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjFCeENfYm1xcSIsImlhdCI6MTU0NzU0NDgyMDY3OSwiZXhwIjoxNTQ3NjMxMjIwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6InUtSlNMWFZFaCIsImZpcnN0TmFtZSI6InZpcmF0IiwibGFzdE5hbWUiOiJyb2hpdCIsIm1vYmlsZU51bWJlciI6MTIzNDU2Nzg5MCwiaXNBZG1pbiI6ZmFsc2UsInVzZXJOYW1lIjoic2hhcm1hIiwiZW1haWwiOiJyb2hpdC5zaGFybWFAeHl6LmNvbSIsImNvdW50cnlOYW1lIjoiSU4iLCJjb3VudHJ5Q29kZSI6OTF9fQ.uoxyloDAY7A8KttX-VcQZOGGTYNR1qEGZRWK0dCHxKs\",\n          \"userDetails\": {\n              \"countryCode\": 91\n              \"countryName\": \"IN\"\n              \"email\": \"rohit.sharma@xyz.com\"\n              \"firstName\": \"virat\"\n              \"lastName\": \"rohit\"\n              \"fullName\": \"virat rohit\"\n              \"mobileNumber\": 1234567890\n              \"userId\": \"u-JSLXVEh\"\n              \"userName\": \"sharma\"\n          }\n      }\n  }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout/:userId",
    "title": "api to log out",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User ID of the user (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"Logged Out Successfully\",\n      \"status\": 200,\n      \"data\": null\n  }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogoutUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/resetPassword",
    "title": "api to reset the password",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "userId",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id of the user (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n      \"error\": false,\n      \"message\": \"email successfully reset\",\n      \"status\": 200,\n      \"data\": { \n          \"error\": false,\n          \"message\": \"password changed successfully\",\n          \"status\": 200,\n          \"data\": \"password changed successfully\" \n      } \n  }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersResetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for new user signUp",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "fullName",
            "description": "<p>fullName of the user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>User Name of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "countryName",
            "description": "<p>Country Name of user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user. (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"User created\",\n      \"status\": 200,\n      \"data\": {\n          \"countryCode\": 91\n          \"countryName\": \"IN\"\n          \"createdOn\": \"2019-01-15T09:28:19.000Z\"\n          \"email\": \"rohit.sharma@xyz.com\"\n          \"firstName\": \"virat\"\n          \"lastName\": \"rohit\"\n          \"fullName\": \"virat rohit\"\n          \"mobileNumber\": 1234567890    \n          \"userId\": \"u-JSLXVEh\"\n          \"userName\": \"sharma\"\n          \"__v\": 0\n          \"_id\": \"5c3da7b3cf9e321178b71f3d\"\n      }\n  }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/socialLogin",
    "title": "api for social login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of the user. (body params)(required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "fullName",
            "description": "<p>fullName of the user. (body params)(required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n      \"error\": false,\n      \"message\": \"Login Successful\",\n      \"status\": 200,\n      \"data\": {\n          \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IjFCeENfYm1xcSIsImlhdCI6MTU0NzU0NDgyMDY3OSwiZXhwIjoxNTQ3NjMxMjIwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7InVzZXJJZCI6InUtSlNMWFZFaCIsImZpcnN0TmFtZSI6InZpcmF0IiwibGFzdE5hbWUiOiJyb2hpdCIsIm1vYmlsZU51bWJlciI6MTIzNDU2Nzg5MCwiaXNBZG1pbiI6ZmFsc2UsInVzZXJOYW1lIjoic2hhcm1hIiwiZW1haWwiOiJyb2hpdC5zaGFybWFAeHl6LmNvbSIsImNvdW50cnlOYW1lIjoiSU4iLCJjb3VudHJ5Q29kZSI6OTF9fQ.uoxyloDAY7A8KttX-VcQZOGGTYNR1qEGZRWK0dCHxKs\",\n          \"userDetails\": {\n              \"countryCode\": \n              \"countryName\": \"\"\n              \"email\": \"rohit.sharma@xyz.com\"\n              \"firstName\": \"rohit\"\n              \"lastName\": \"sharma\"\n              \"fullName\":\"rohit sharma\"\n              \"mobileNumber\": \n              \"userId\": \"u-JSLXVEh\"\n              \"userName\": \"\"\n          }\n      }\n  }",
          "type": "object"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSociallogin"
  },
  {
    "type": "put",
    "url": "/api/v1/users/:userId/edit",
    "title": "Edit user by userId",
    "version": "0.0.1",
    "group": "users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user passed as the URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>parameters passed for editing</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n        \"message\": \"User details edited\",\n        \"status\": 200,\n        \"data\": {\n                    \"n\": 1,\n                    \"nModified\": 1,\n                    \"ok\": 1 \n                }\n\t    }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/UserRoutes.js",
    "groupTitle": "users",
    "name": "PutApiV1UsersUseridEdit"
  },
  {
    "group": "watcher",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/watcher/allWatchers",
    "title": "api to fetch all watchers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the user (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"all watchers found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"watcherId\": \"j7aSjhxWq\",\n            \"userId\": \"Nz5ZbDvTj\",\n            \"createdBy\": \"manish kumar\",\n            \"createdForIssueId\": \"Ca5l4Agsd\",\n            \"createdOn\": \"2019-02-11T16:34:21.000Z\"\n        },\n        {\n            \"watcherId\": \"sqwABYOOu\",\n            \"userId\": \"Nz5ZbDvTj\",\n            \"createdBy\": \"manish kumar\",\n            \"createdForIssueId\": \"7HYRRKwqA\",\n            \"createdOn\": \"2019-02-11T18:17:38.000Z\"\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/WatcherRoutes.js",
    "groupTitle": "watcher",
    "name": "GetApiV1WatcherAllwatchers"
  },
  {
    "group": "watcher",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/watcher/getAllWatchersOfPaticularIssueOnInit",
    "title": "api to get all watchers of a particular issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization(body param/header/query param) Token of the user (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of issue (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http stataus code, result</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"watchers found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"_id\": \"5c61bc963c1dda101cd4d449\",\n            \"watcherId\": \"QaC2jAZo-\",\n            \"userId\": \"GeT-ZbwOx\",\n            \"createdBy\": \"vaibhav tak\",\n            \"createdForIssueId\": \"z_ujPe9B5\",\n            \"createdOn\": \"2019-02-11T18:19:02.000Z\",\n            \"__v\": 0\n        }\n    ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/WatcherRoutes.js",
    "groupTitle": "watcher",
    "name": "GetApiV1WatcherGetallwatchersofpaticularissueoninit"
  },
  {
    "group": "watcher",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/watcher/createWatcher",
    "title": "api to add watcher",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdBy",
            "description": "<p>Name of the user who created watcher (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>ID of the user who created the watcher (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdForIssueId",
            "description": "<p>ID of the Issue for whom the watcher was created (body param) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token(body param/header/query param) of the user who created watcher (body param) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \n     \"error\": false,\n     \"message\": \"watcher created\",\n     \"status\": 200,\n     \"data\": {\n            \"createdBy\": \"vaibhav tak\"\n            \"userId\": \"-zGtGVXTk\"\n            \"createdForIssueId\": \"3zclPt-r7\"\n            \"createdOn\": \"2019-02-12T18:45:45.000Z\"\n            \"watcherId\": \"jPOLNs4gd\"\n            \"__v\": 0\n            \"_id\": \"5c3f7bd9fdf17d172c3d9e47\"\n \n      } \n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/WatcherRoutes.js",
    "groupTitle": "watcher",
    "name": "PostApiV1WatcherCreatewatcher"
  },
  {
    "group": "watcher",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/watcher/deleteWatcher",
    "title": "api to delete watcher by user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>User Id of the watcher which is to be deleted</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "createdForIssueId",
            "description": "<p>IssueId of issue</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"watcher was successfully deleted\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "routes/WatcherRoutes.js",
    "groupTitle": "watcher",
    "name": "PostApiV1WatcherDeletewatcher"
  }
] });
