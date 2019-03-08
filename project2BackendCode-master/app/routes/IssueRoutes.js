const express = require('express');
const issueController = require("../controllers/IssueController");
const appConfig = require("./../../config/appConfig")
const auth = require('../middlewares/auth')
const multer = require('multer');
const router = express.Router();
var path = require('path');

let store = multer.diskStorage({
  destination:function(req,file,cb){
      cb(null, './uploads');
  },
  filename:function(req,file,cb){
      cb(null, Date.now()+'.'+file.originalname);
  }
});


let upload = multer({storage:store}).single('file');



let setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/issue`;

  app.post(`${baseUrl}/file/upload`, function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.status(501).json({error:err});
        }
        //do all database record saving activity
        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});


app.post(`${baseUrl}/file/download`, function(req,res,next){
    filepath = path.join(__dirname,'./../../uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
});



  // params: title, createdByEmail, createdBy, createdById,createdByEmail, createdForEmail, createdFor,fullNameCreatedFor,issueId,status,description,attachment
  app.post(`${baseUrl}/createIssue`, auth.isAuthorized, issueController.createIssue);
  /**
   * @apiGroup issue
   * @apiVersion 1.0.0
   * @api {post} /api/v1/issue/createIssue api to add issue
   * 
   * @apiParam {string} title Title of the issue (body param) (required)
   * @apiParam {string} createdBy Name of the Person who reported issue (body param) (required)
   * @apiParam {string} createdByEmail Email of the Person who Reported the issue (body param) (required)
   * @apiParam {string} createdById ID of the Person who created the issue (body param) (required)
   * @apiParam {string} createdFor ID of the Person to whom the issue is assigned (body param) (required)
   * @apiParam {string} createdForEmail Email of the Person to whom the issue is assigned (body param) (required)
   * @apiParam {string} fullNameCreatedFor Full name of the Person to whom the issue is assigned (body param) (required)
   * @apiParam {string} status status of the  issue (body param) (required)
   * @apiParam {string} description Description of the issue (body param) (required)
   * @apiParam {string} attachment File Name of the issue Screenshot (body param) (required)
   * @apiParam {string} authToken Authorization Token(body param/header/query param) of the Person who created issue (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * { 
     "error": false,
     "message": "issue created",
     "status": 200,
     "data": {
            "createdBy": "vaibhav tak"
            "createdByEmail": "vaibhav.tak@xyz.com"
            "createdById": "-zGtGVXTk"
            "createdFor": "3zclPt-r7"
            "createdForEmail": "aman.garg@xyz.com"
            "fullNameCreatedFor": "aman garg"
            "createdOn": "2019-02-12T18:45:45.000Z"
            "attachment": "1549719315834.user.png"
            "status": "backlog"
            "issueId": "jPOLNs4gd"
            "description": "issue in command"
            "title": "Issue1"
            "__v": 0
            "_id": "5c3f7bd9fdf17d172c3d9e47"
 
      } 
}
   */

  // params: title,status,description,createdBy,createdById,createdFor,createdForEmail,fullNameCreatedFor,attachment
  app.put(`${baseUrl}/updateIssue/:issueId`, auth.isAuthorized, issueController.updateIssue)
  /**
   * @apiGroup issue
   * @apiVersion 1.0.0
   * @api {put} /api/v1/issue/updateIssue/:issueId api to update issue
   * 
   * @apiParam {string} title Title of the issue (body param) (required)
   * @apiParam {string} createdBy Name of the Person who reported issue (body param) (required)
   * @apiParam {string} createdByEmail Email of the Person who Reported the issue (body param) (required)
   * @apiParam {string} createdById ID of the Person who created the issue (body param) (required)
   * @apiParam {string} createdFor ID of the Person to whom the issue is assigned (body param) (required)
   * @apiParam {string} createdForEmail Email of the Person to whom the issue is assigned (body param) (required)
   * @apiParam {string} fullNameCreatedFor Full name of the Person to whom the issue is assigned (body param) (required)
   * @apiParam {string} status status of the  issue (body param) (required)
   * @apiParam {string} description Description of the issue (body param) (required)
   * @apiParam {string} attachment File Name of the issue Screenshot (body param) (required)
   * @apiParam {string} authToken Authorization Token(body param/header/query param) of the Person who created issue (body param) (required)
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

  app.get(`${baseUrl}/allIssues`, auth.isAuthorized, issueController.getAllIssues)
  /**
   * @apiGroup issue
   * @apiVersion 1.0.0
   * @api {get} /api/v1/issue/allIssues api to fetch all issues
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the Person (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "all issues found",
    "status": 200,
    "data": [
        {
            "issueId": "z_ujPe9B5",
            "title": "def",
            "fullNameCreatedFor": "aman garg",
            "status": "Backlog",
            "createdBy": "vaibhav tak",
            "createdByEmail": "vaibhav.tak@xyz.com",
            "createdById": "GeT-ZbwOx",
            "description": "def",
            "attachment": "1549826628192.user.png",
            "createdForEmail": "aman.garg@xyz.com",
            "createdFor": "461gu6f9v",
            "createdOn": "2019-02-10T19:23:50.000Z"
        },
        {
            "issueId": "jMchMYCHw",
            "title": "Issue1",
            "fullNameCreatedFor": "vaibhav tak",
            "status": "Backlog",
            "createdBy": "manish kumar",
            "createdByEmail": "manish.kumar@xyz.com",
            "createdById": "Nz5ZbDvTj",
            "description": "<b>Issue1 description</b>",
            "attachment": "1549915486758.user.png",
            "createdForEmail": "vaibhav.tak@xyz.com",
            "createdFor": "461gu6f9v",
            "createdOn": "2019-02-11T20:04:48.000Z"
        }
    ]
}
   */


  // param: issueId
  app.get(`${baseUrl}/getSingleIssue/:issueId`, auth.isAuthorized, issueController.getSingleIssue)
  /**
   * @apiGroup issue
   * @apiVersion 1.0.0
   * @api {get} /api/v1/issue/getSingleIssue/:issueId api to get selected issue
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the Person (body param) (required)
   * @apiParam {string} issueId Issue ID of the issue (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "Issue Found",
    "status": 200,
    "data": {
            "_id": "5c607a46ce34cb1504c5a32c",
            "issueId": "z_ujPe9B5",
            "title": "Issue",
            "fullNameCreatedFor": "aman garg",
            "status": "Backlog",
            "createdBy": "vaibhav tak",
            "createdByEmail": "vaibhav.tak@xyz.com",
            "createdById": "GeT-ZbwOx",
            "description": "Issue1",
            "attachment": "1549826628192.user.png",
            "createdForEmail": "aman.garg@xyz.com",
            "createdFor": "461gu6f9v",
            "createdOn": "2019-02-10T19:23:50.000Z",
            "__v": 0
    }
}
   */

  // param: userId
  app.get(`${baseUrl}/getAllIssuesAssignedToParticularUserOnInit/:userId`,auth.isAuthorized, issueController.getAllIssuesAssignedToParticularUserOnInit)
  /**
   * @apiGroup issue
   * @apiVersion 1.0.0
   * @api {get} /api/v1/issue/getNormalIssues/:userId api to fetch all issues of Person
   * 
   * @apiParam {string} authToken Authorization(body param/header/query param) Token of the Person (body param) (required)
   * @apiParam {string} userId User Id of Person (body param) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http stataus code, result
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "issues found",
    "status": 200,
    "data": [
        {
            "_id": "5c607a46ce34cb1504c5a32c",
            "issueId": "z_ujPe9B5",
            "title": "issue",
            "fullNameCreatedFor": "aman garg",
            "status": "Backlog",
            "createdBy": "vaibhav tak",
            "createdByEmail": "vaibhav.tak@xyz.com",
            "createdById": "GeT-ZbwOx",
            "description": "in code",
            "attachment": "1549826628192.user.png",
            "createdForEmail": "aman.garg@xyz.com",
            "createdFor": "461gu6f9v",
            "createdOn": "2019-02-10T19:23:50.000Z",
            "__v": 0
        },
        {
            "_id": "5c607f2ace34cb1504c5a32f",
            "issueId": "6oKLyF3Gm",
            "title": "Issue2",
            "fullNameCreatedFor": "aman garg",
            "status": "Backlog",
            "createdBy": "vaibhav tak",
            "createdByEmail": "vaibhav.tak@xyz.com",
            "createdById": "GeT-ZbwOx",
            "description": "found",
            "attachment": "1549827880270.user.png",
            "createdForEmail": "aman.garg@xyz.com",
            "createdFor": "461gu6f9v",
            "createdOn": "2019-02-10T19:44:42.000Z",
            "__v": 0
        }
    ]
}
   */

  // param: issueId
  app.post(`${baseUrl}/deleteIssue/:issueId`,auth.isAuthorized, issueController.deleteIssue)
  /**
   * @apiGroup issue
   * @apiVersion 1.0.0
   * @api {post} /api/v1/issue/deleteIssue/:issueId api to delete issue by Person
   * 
   * @apiParam {string} issueId Issue Id of the issue which is to be deleted
   * @apiParam {string} authToken Authorization Token of the Person
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
   * {
    "error": false,
    "message": "issue was successfully deleted",
    "status": 200,
    "data": {
        "issueId": "Ca5l4Agsd",
        "title": "ijk",
        "fullNameCreatedFor": "aman garg",
        "status": "Backlog",
        "createdBy": "vaibhav tak",
        "createdByEmail": "vaibhav.tak@xyz.com",
        "createdById": "GeT-ZbwOx",
        "description": "ijk",
        "attachment": "1549827908686.user.png",
        "createdForEmail": "aman.garg@xyz.com",
        "createdFor": "461gu6f9v",
        "createdOn": "2019-02-10T19:45:11.000Z",
        "_id": "5c607f47ce34cb1504c5a330",
        "__v": 0
    }
}
   */

}

module.exports = {
  setRouter: setRouter,
  router
}