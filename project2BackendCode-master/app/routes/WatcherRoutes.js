const express = require('express');
const watcherController = require("../controllers/WatcherController");
const appConfig = require("./../../config/appConfig")
const auth = require('../middlewares/auth')

let setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/watcher`;

  // params: userId, createdBy, createdForIssueId,authToken
  app.post(`${baseUrl}/createWatcher`, auth.isAuthorized, watcherController.createWatcher);
  /**
   * @apiGroup watcher
   * @apiVersion 1.0.0
   * @api {post} /api/v1/watcher/createWatcher api to add watcher
   * 
   * @apiParam {string} createdBy Name of the user who created watcher (body param) (required)
   * @apiParam {string} userId ID of the user who created the watcher (body param) (required)
   * @apiParam {string} createdForIssueId ID of the Issue for whom the watcher was created (body param) (required)
   * @apiParam {string} authToken Authorization Token(body param/header/query param) of the user who created watcher (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * { 
     "error": false,
     "message": "watcher created",
     "status": 200,
     "data": {
            "createdBy": "vaibhav tak"
            "userId": "-zGtGVXTk"
            "createdForIssueId": "3zclPt-r7"
            "createdOn": "2019-02-12T18:45:45.000Z"
            "watcherId": "jPOLNs4gd"
            "__v": 0
            "_id": "5c3f7bd9fdf17d172c3d9e47"
 
      } 
}
   */


   // query params: issueId
  app.get(`${baseUrl}/getAllWatchersOfPaticularIssueOnInit/:issueId`, auth.isAuthorized, watcherController.getAllWatchersOfPaticularIssueOnInit)
  /**
   * @apiGroup watcher
   * @apiVersion 1.0.0
   * @api {get} /api/v1/watcher/getAllWatchersOfPaticularIssueOnInit api to get all watchers of a particular issue
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the user (body param) (required)
   * @apiParam {string} issueId issueId of issue (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "watchers found",
    "status": 200,
    "data": [
        {
            "_id": "5c61bc963c1dda101cd4d449",
            "watcherId": "QaC2jAZo-",
            "userId": "GeT-ZbwOx",
            "createdBy": "vaibhav tak",
            "createdForIssueId": "z_ujPe9B5",
            "createdOn": "2019-02-11T18:19:02.000Z",
            "__v": 0
        }
    ]
}
   */


  app.get(`${baseUrl}/allWatchers`,auth.isAuthorized, watcherController.getAllWatchers)
  /**
   * @apiGroup watcher
   * @apiVersion 1.0.0
   * @api {get} /api/v1/watcher/allWatchers api to fetch all watchers
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the user (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "all watchers found",
    "status": 200,
    "data": [
        {
            "watcherId": "j7aSjhxWq",
            "userId": "Nz5ZbDvTj",
            "createdBy": "manish kumar",
            "createdForIssueId": "Ca5l4Agsd",
            "createdOn": "2019-02-11T16:34:21.000Z"
        },
        {
            "watcherId": "sqwABYOOu",
            "userId": "Nz5ZbDvTj",
            "createdBy": "manish kumar",
            "createdForIssueId": "7HYRRKwqA",
            "createdOn": "2019-02-11T18:17:38.000Z"
        }
    ]
}
   */

 

  //param : userId,createdForIssueId
  app.post(`${baseUrl}/deleteWatcher`,auth.isAuthorized, watcherController.deleteWatcher)
  /**
   * @apiGroup watcher
   * @apiVersion 1.0.0
   * @api {post} /api/v1/watcher/deleteWatcher api to delete watcher by user
   * 
   * @apiParam {string} userId User Id of the watcher which is to be deleted
   * @apiParam {string} authToken Authorization Token of the user
   * @apiParam {string} createdForIssueId IssueId of issue 
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "watcher was successfully deleted",
    "status": 200,
    "data": {
        "n": 1,
        "ok": 1
    }
}
   */

}

module.exports = {
  setRouter: setRouter
}