const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const emailSend = require('../libs/emailSend')
const check = require('../libs/checkLib')
const AuthModel = mongoose.model('Auth')
const UserModel = mongoose.model('User')
const CommentModel = mongoose.model('Comment')
const logger = require('./../libs/loggerLib');



let createComment = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.comment) {
                resolve(req)
            } else {
                let apiResponse = response.generate(true, 'some fields are empty', 400, null)
                reject(apiResponse)
            }
        })
    }
    let addThisComment = () => {
        return new Promise((resolve, reject) => {
            let newComment = new CommentModel({
                commentId: shortid.generate(),
                comment:req.body.comment,
                createdBy: req.body.createdBy,
                createdById: req.body.createdById,
                createdForReporterEmail: req.body.createdForReporterEmail,
                createdForIssueId: req.body.createdForIssueId,
                createdOn: time.now(),
            })
            newComment.save((err, result) => {
                if (err) {
                    logger.error(err.message, 'Comment Controller: addThisComment', 10)
                    let apiResponse = response.generate(true, 'failed to save the comment details', 417, null)
                    reject(apiResponse)
                } else {
                    let newCommentObj = result.toObject()
                    emailSend.emailSend(newCommentObj.createdForReporterEmail, `<b>${newCommentObj.createdBy} has commented on for your issue `)
                    resolve(newCommentObj)

                }
            })
        })
    }
    validateUserInput(req, res)
        .then(addThisComment)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'comment created', 200, resolve)
            res.send(apiResponse)
        }).catch(err => res.send(err))
}




/** function to display all comment */

let getAllComments = (req, res) => {
    CommentModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'Comment Controller: getAllComments', 10)
                let apiResponse = response.generate(true, 'Failed To Find Comments', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Comment Found', 'Comment Controller: getAllComments',7)
                let apiResponse = response.generate(true, 'No Comment Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Comments  Found', 200, result)
                res.send(apiResponse)
            }
        })
}





let updateComment = (req, res) => {
    let findComments = () => {
        return new Promise((resolve, reject) => {
            CommentModel.findOne({
                commentId: req.params.commentId
            }, (err, result) => {
                if (err) {
                    logger.error(err.message, 'Comment Controller: updateComment', 10)
                    let apiResponse = response.generate(true, 'error finding comment', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Comment Found', 'Comment Controller: updateComment',7)
                    let apiResponse = response.generate(true, 'failed to find comment', 404, null)
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
            CommentModel.update({
                commentId: req.params.commentId
            }, options, (err, result1) => {
                if (err) {
                    logger.error(err.message, 'Comment Controller: updateComment', 10)
                    let apiResponse = response.generate(true, 'failed to update comment', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result1)) {
                    logger.info('No Comment Found', 'Comment Controller: update',7)
                    let apiResponse = response.generate(true, 'error finding comment', 404, null)
                    reject(apiResponse)
                } else {
                    let comment = result
                    resolve(result1)
                }
            })
        })
    }
    findComments()
        .then(update)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'updated successfully', 200, resolve)
            res.send(apiResponse)
        }).catch((err) => res.send(err))
}

let deleteComment = (req, res) => {
    let findComment = () => {
        return new Promise((resolve, reject) => {
            CommentModel.findOne({
                commentId: req.params.commentId
            }, (err, result) => {
                if (err) {
                    logger.error(err.message, 'Comment Controller: deleteComment', 10)
                    let apiResponse = response.generate(true, 'error finding comment', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Comment Found', 'Comment Controller: deleteComment',7)
                    let apiResponse = response.generate(true, 'failed to find comment', 404, null)
                    reject(apiResponse)
                } else {
                    resolve(result)
                }
            })
        })
    }
    let deleteThisComment = (result) => {
        return new Promise((resolve, reject) => {
            CommentModel.findOneAndRemove({
                commentId: req.params.commentId
            }, (err, result1) => {
                if (err) {
                    logger.error(err.message, 'Comment Controller: deleteComment', 10)
                    let apiResponse = response.generate(true, 'error deleting comment', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result1)) {
                    logger.info('No Comment Found', 'Comment Controller: deleteThisComment',7)
                    let apiResponse = response.generate(true, 'failed to deleting comment', 404, null)
                    reject(apiResponse)
                } else {
                    resolve(result1)
                }
            })
        })
    }
    findComment()
        .then(deleteThisComment)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'comment was successfully deleted', 200, resolve)
            res.send(apiResponse)
        }).catch((err) => res.send(err))
}

let getAllCommentsOfPaticularIssueOnInit = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.issueId)) {
                logger.info('No Comment Found', 'Comment Controller: getAllCommentsOfPaticularIssueOnInit',7)
                let apiResponse = response.generate(true, 'issueID parameter is missing', 401, null)
                reject(apiResponse)
            } else {
                resolve(req)
            }
        })
    }
    
    let findComments = (req) => {

        return new Promise((resolve, reject) => {
            CommentModel.find({
                createdForIssueId: req.params.issueId
            })
                .select()
                .lean()
                .exec((err, result1) => {
                    if (err) {
                        logger.error(err.message, 'Comment Controller: findComments', 10)
                        let apiResponse = response.generate(true, 'error finding comment', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result1)) {
                        logger.info('No Comment Found', 'Comment Controller: findComments',7)
                        let apiResponse = response.generate(true, 'No Comments Found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(result1)
                    }
                })
        })

    }
    validateUserInput()
        .then(findComments)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'comments found', 200, resolve)
            res.send(apiResponse)
        }).catch((err) => res.send(err))
}




module.exports = {
    createComment: createComment,
    getAllComments: getAllComments,
    updateComment: updateComment,
    deleteComment: deleteComment,
    getAllCommentsOfPaticularIssueOnInit: getAllCommentsOfPaticularIssueOnInit
}
