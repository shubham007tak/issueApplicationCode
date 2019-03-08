const express = require('express');
const commentController = require("../controllers/CommentController");
const appConfig = require("./../../config/appConfig")
const auth = require('../middlewares/auth')

let setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/comment`;

  // params:  comment, createdByEmail, createdBy, createdById, createdForIssueId
  app.post(`${baseUrl}/createComment`, auth.isAuthorized, commentController.createComment);
  /**
   * @apiGroup comment
   * @apiVersion 1.0.0
   * @api {post} /api/v1/comment/createComment api to add comment
   * 
   * @apiParam {string} comment Comment (body param) (required)
   * @apiParam {string} createdBy Name of the user who created comment (body param) (required)
   * @apiParam {string} createdByEmail Email of the user who created the comment (body param) (required)
   * @apiParam {string} createdById ID of the user who created the comment (body param) (required)
   * @apiParam {string} createdForIssueId IssueId of the Issue for whom the comment was created (body param) (required)
   * @apiParam {string} authToken Authorization Token(body param/header/query param) of the user who created comment (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * { 
     "error": false,
     "message": "comment created",
     "status": 200,
     "data": {
            "createdBy": "vaibhav tak"
            "createdByEmail": "vaibhav.tak@xyz.com"
            "createdById": "-zGtGVXTk"
            "createdForIssueId": "Ca5l4Agsd"
            "createdOn": "2019-01-16T18:45:45.000Z"
            "commentId": "jPOLNs4gd"
            "comment": "Comment1"
            "__v": 0
            "_id": "5c3f7bd9fdf17d172c3d9e47"
 
      } 
}
   */

  // params: comment, createdByEmail, createdBy, createdById, createdForIssueId
  app.put(`${baseUrl}/updateComment/:commentId`, auth.isAuthorized, commentController.updateComment)
  /**
   * @apiGroup comment
   * @apiVersion 1.0.0
   * @api {put} /api/v1/comment/updateComment/:commentId api to update comment
   * 
   * @apiParam {string} comment Comment (body param) (required)
   * @apiParam {string} createdBy Name of the user who created comment (body param) (required)
   * @apiParam {string} createdByEmail Email of the user who created the comment (body param) (required)
   * @apiParam {string} createdById ID of the user who created the comment (body param) (required)
   * @apiParam {string} createdForIssueId IssueId of the Issue for whom the comment was created (body param) (required)
   * @apiParam {string} authToken Authorization Token(body param/header/query param) of the user who created comment (body param) (required)
   * 
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "updated successfully",
    "status": 200,
    "data": {
        "n": 1,
        "nModified": 0,
        "ok": 1
    }
}
   */

  
  app.get(`${baseUrl}/allComments`, auth.isAuthorized, commentController.getAllComments)
  /**
   * @apiGroup comment
   * @apiVersion 1.0.0
   * @api {get} /api/v1/comment/allComments/:userId api to fetch all comments
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the user (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "all comments found",
    "status": 200,
    "data": [
        {
            "commentId": "ZWSLznPfN",
            "createdBy": "ajnaj nknkn",
            "createdByEmail": "bgm29484@cndps.com",
            "createdById": "ZeLfckGTd",
            "comment": "issue is general",
            "createdForIssueId": "3oPYTsFoF",
            "createdOn": "2019-02-06T10:32:46.000Z"
        },
        {
            "commentId": "NHxbqHVCo",
            "createdBy": "ajnaj nknkn",
            "createdByEmail": "bgm29484@cndps.com",
            "createdById": "ZeLfckGTd",
            "comment": "issue found",
            "createdForIssueId": "3oPYTsFoF",
            "createdOn": "2019-02-06T10:52:08.000Z"
        }
    ]
}
   */


   // query params: issueId
  app.get(`${baseUrl}/getAllCommentsOfPaticularIssueOnInit/:issueId`,auth.isAuthorized, commentController.getAllCommentsOfPaticularIssueOnInit)
  /**
   * @apiGroup comment
   * @apiVersion 1.0.0
   * @api {get} /api/v1/comment/getCommentOnClick api to get all comments of a particular user on Click as user
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the user (body param) (required)
   * @apiParam {string} issueId Issue Id of issue (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "comments found",
    "status": 200,
    "data": [
        {
            "_id": "5c5ab7cec6ccf90cb86cca9d",
            "commentId": "ZWSLznPfN",
            "createdBy": "ajnaj nknkn",
            "createdByEmail": "bgm29484@cndps.com",
            "createdById": "ZeLfckGTd",
            "comment": "issue",
            "createdForIssueId": "3oPYTsFoF",
            "createdOn": "2019-02-06T10:32:46.000Z",
            "__v": 0
        },
        {
            "_id": "5c5abc58c6ccf90cb86ccaa4",
            "commentId": "NHxbqHVCo",
            "createdBy": "ajnaj nknkn",
            "createdByEmail": "bgm29484@cndps.com",
            "createdById": "ZeLfckGTd",
            "comment": "comment is there",
            "createdForIssueId": "3oPYTsFoF",
            "createdOn": "2019-02-06T10:52:08.000Z",
            "__v": 0
        }
    ]
}
   */

  
 
  // param: commentId
  app.post(`${baseUrl}/deleteComment/:commentId`,auth.isAuthorized, commentController.deleteComment)
  /**
   * @apiGroup comment
   * @apiVersion 1.0.0
   * @api {post} /api/v1/comment/deleteComment/:commentId api to delete comment by user
   * 
   * @apiParam {string} commentId Comment Id of the comment which is to be deleted
   * @apiParam {string} authToken Authorization Token of the user
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "comment was successfully deleted",
    "status": 200,
    "data": {
        "commentId": "NHxbqHVCo",
        "createdBy": "aman garg",
        "createdByEmail": "bgm29484@cndps.com",
        "createdById": "ZeLfckGTd",
        "comment": "comment",
        "createdForIssueId": "3oPYTsFoF",
        "createdOn": "2019-02-06T10:52:08.000Z",
        "_id": "5c5abc58c6ccf90cb86ccaa4",
        "__v": 0
    }
}
   */

}

module.exports = {
  setRouter: setRouter
}