const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib')
const emailSend = require('../libs/emailSend')
const check = require('../libs/checkLib')
const AuthModel = mongoose.model('Auth')
const UserModel = mongoose.model('User')
const IssueModel = mongoose.model('Issue')
const logger = require('./../libs/loggerLib');



let createIssue = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {

            if (req.body.title && req.body.createdBy && req.body.createdByEmail && req.body.createdById &&
                req.body.createdFor && req.body.createdForEmail && req.body.description && req.body.status) {

                resolve(req)
            } else {
                let apiResponse = response.generate(true, 'some fields are empty', 400, null)

                reject(apiResponse)
            }
        })
    }
    let addThisIssue = () => {

        return new Promise((resolve, reject) => {

            let newIssue = new IssueModel({
                issueId: shortid.generate(),
                title: req.body.title,
                createdBy: req.body.createdBy,
                createdById: req.body.createdById,
                createdByEmail: req.body.createdByEmail,
                createdFor: req.body.createdFor,
                createdForEmail: req.body.createdForEmail,
                description: req.body.description,
                attachment: req.body.attachment,
                status: req.body.status,
                fullNameCreatedFor: req.body.fullNameCreatedFor,
                createdOn: time.now(),
            })
            newIssue.save((err, result) => {

                if (err) {
                    logger.error(err.message, 'Issue Controller: createIssue', 10)
                    let apiResponse = response.generate(true, 'failed to save the issue details', 417, null)
                    reject(apiResponse)
                } else {

                    let newIssueObj = result.toObject()
                    emailSend.emailSend(newIssueObj.createdForEmail, `<b>${newIssueObj.createdBy} has set a issue for you`)
                    resolve(newIssueObj)

                }
            })
        })
    }
    validateUserInput(req, res)
        .then(addThisIssue)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'issue created', 200, resolve)
            res.send(apiResponse)
        }).catch(err => res.send(err))
}



let getSingleIssue = (req, res) => {
    IssueModel.findOne({
        issueId: req.params.issueId
    })
        .select()
        .lean()
        .exec((err, issueDetails) => {
            if (err) {
                logger.error(err.message, 'Issue Controller: getSingleIssue', 10)
                let apiResponse = response.generate(true, 'Error finding issue details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(issueDetails)) {
                let apiResponse = response.generate(true, 'No Issue Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Issue Found', 200, issueDetails)
                res.send(apiResponse)
            }
        })
}

/** function to display all issue on ngOnInit */

let getAllIssues = (req, res) => {
    IssueModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'Issue Controller: getAllIssues', 10)
                let apiResponse = response.generate(true, 'Failed To Find Issues', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Issue Found', 'Issue Controller: getAllIssues')
                let apiResponse = response.generate(true, 'No Issue Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Issues  Found', 200, result)
                res.send(apiResponse)
            }
        })
}


let updateIssue = (req, res) => {
    let findIssues = () => {
        return new Promise((resolve, reject) => {
            IssueModel.findOne({
                issueId: req.params.issueId
            }, (err, result) => {
                if (err) {
                    logger.error(err.message, 'Issue Controller: updateIssue', 10)
                    let apiResponse = response.generate(true, 'error finding issue', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    let apiResponse = response.generate(true, 'failed to find issue', 404, null)
                    reject(apiResponse)
                } else {
                    resolve(result)
                }
            })
        })
    }
    let update = (result) => {
        return new Promise((resolve, reject) => {
            let options = req.body
            IssueModel.update({
                issueId: req.params.issueId
            }, options, (err, result1) => {
                if (err) {
                    logger.error(err.message, 'Issue Controller: updateIssue', 10)
                    let apiResponse = response.generate(true, 'failed to update issue', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result1)) {
                    let apiResponse = response.generate(true, 'error finding issue', 404, null)
                    reject(apiResponse)
                } else {
                    let issue = result
                    emailSend.emailSend(issue.createdForEmail, `Hey, your issue has been updated.Kindly login and check the updated details`)
                    resolve(result1)
                }
            })
        })
    }
    findIssues()
        .then(update)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'updated successfully', 200, resolve)
            res.send(apiResponse)
        }).catch((err) => res.send(err))
}



let getAllIssuesAssignedToParticularUserOnInit = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.userId)) {
                let apiResponse = response.generate(true, 'userID parameter is missing', 401, null)
                reject(apiResponse)
            } else {
                resolve(req)
            }
        })
    }
    let findUser = (req) => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({
                userId: req.params.userId
            }, (err, result) => {
                if (err) {
                    logger.error(err.message, 'Issue Controller: getAllIssuesAssignedToParticularUserOnInit', 10)
                    let apiResponse = response.generate(true, 'error finding user', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    let apiResponse = response.generate(true, 'failed to find user details', 404, null)
                    reject(apiResponse)
                } else {
                    resolve(result)
                }
            })
        })
    }
    let findIssues = (result) => {

        return new Promise((resolve, reject) => {
            IssueModel.find({
                createdFor: result.userId
            })
                .select()
                .lean()
                .exec((err, result1) => {
                    if (err) {
                        logger.error(err.message, 'Issue Controller: getAllIssuesAssignedToParticularUserOnInit', 10)
                        let apiResponse = response.generate(true, 'error finding issues', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        let apiResponse = response.generate(true, 'failed to find issue', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(result1)
                    }
                })
        })

    }
    validateUserInput()
        .then(findUser)
        .then(findIssues)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'issues found', 200, resolve)
            res.send(apiResponse)
        }).catch((err) => res.send(err))
}



let deleteIssue = (req, res) => {
    let findIssue = () => {
        return new Promise((resolve, reject) => {
            IssueModel.findOne({
                issueId: req.params.issueId
            }, (err, result) => {
                if (err) {
                    logger.error(err.message, 'Issue Controller: deleteIssue', 10)
                    let apiResponse = response.generate(true, 'error finding issue', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    let apiResponse = response.generate(true, 'failed to find issue', 404, null)
                    reject(apiResponse)
                } else {
                    resolve(result)
                }
            })
        })
    }
    let deleteThisIssue = (result) => {
        return new Promise((resolve, reject) => {
            IssueModel.findOneAndRemove({
                issueId: req.params.issueId
            }, (err, result1) => {
                if (err) {
                    logger.error(err.message, 'Issue Controller: deleteThisIssue', 10)
                    let apiResponse = response.generate(true, 'error deleting issue', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result1)) {
                    let apiResponse = response.generate(true, 'failed to deleting issue', 404, null)
                    reject(apiResponse)
                } else {
                    emailSend.emailSend(result.createdForEmail, `<b>Issue with title:${result.title} was deleted by ${req.params.userFullName}/You</b>`)
                    resolve(result1)
                }
            })
        })
    }
    findIssue()
        .then(deleteThisIssue)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'issue was successfully deleted', 200, resolve)
            res.send(apiResponse)
        }).catch((err) => res.send(err))
}




module.exports = {
    createIssue: createIssue,
    getSingleIssue: getSingleIssue,
    getAllIssues: getAllIssues,
    updateIssue: updateIssue,
    getAllIssuesAssignedToParticularUserOnInit: getAllIssuesAssignedToParticularUserOnInit,
    deleteIssue: deleteIssue
}
