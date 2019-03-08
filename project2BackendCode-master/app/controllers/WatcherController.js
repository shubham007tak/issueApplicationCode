const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const check = require('../libs/checkLib')
const AuthModel = mongoose.model('Auth')
const UserModel = mongoose.model('User')
const WatcherModel = mongoose.model('Watcher')
const logger = require('./../libs/loggerLib');



let createWatcher = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.userId && req.body.createdForIssueId) {
                resolve(req)
            } else {
                let apiResponse = response.generate(true, 'some fields are empty', 400, null)
                reject(apiResponse)
            }
        })
    }
    let findWatcher = () => {
        return new Promise((resolve, reject) => {
            let findQuery = {

                $and: [
                    {
                        userId: req.body.userId
                    },
                    {
                        createdForIssueId: req.body.createdForIssueId
                    }
                ]
            }
            WatcherModel.find(findQuery)
                .select('-_id -__v')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        logger.error(err.message, 'Watcher Controller: createWatcher', 10)
                        let apiResponse = response.generate(true, 'error while finding watcher', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Watcher Found', 'watcherController: findWatcher()', 7)
                        resolve(result)
                    } else {
                        logger.error(' Already a Watcher', 'watcherController: createWatcher', 4)
                        let apiResponse = response.generate(true, 'You are already a Watcher', 403, null)
                        reject(apiResponse)
                    }
                })

        })
    }
    let addThisWatcher = () => {
        return new Promise((resolve, reject) => {
            let newWatcher = new WatcherModel({
                watcherId: shortid.generate(),
                userId: req.body.userId,
                createdForIssueId: req.body.createdForIssueId,
                createdBy: req.body.createdBy,
                createdOn: time.now(),
            })
            newWatcher.save((err, result) => {
                if (err) {
                    logger.error(err.message, 'Watcher Controller: addThisWatcher', 10)
                    let apiResponse = response.generate(true, 'failed to save the watcher details', 417, null)
                    reject(apiResponse)
                } else {
                    let newWatcherObj = result.toObject()
                    resolve(newWatcherObj)

                }
            })
        })
    }
    validateUserInput(req, res)
        .then(findWatcher)
        .then(addThisWatcher)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'watcher created', 200, resolve)
            res.send(apiResponse)
        }).catch(err => res.send(err))
}


/** function to display all watcher */

let getAllWatchers = (req, res) => {
    WatcherModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Watcher Controller: getAllWatchers', 10)
                let apiResponse = response.generate(true, 'Failed To Find Watchers', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Watcher Found', 'Watcher Controller: getAllWatchers', 7)
                let apiResponse = response.generate(true, 'No Watcher Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Watchers  Found', 200, result)
                res.send(apiResponse)
            }
        })
}


let deleteWatcher = (req, res) => {
    let findWatcher = () => {
        return new Promise((resolve, reject) => {
            let findQuery = {

                $and: [
                    {
                        userId: req.body.userId
                    },
                    {
                        createdForIssueId: req.body.createdForIssueId
                    }
                ]
            }
            WatcherModel.find(findQuery)
                .select('-_id -__v')
                .lean()
                .exec((err, result) => {
                    if (err) {
                        logger.error(err.message, 'Watcher Controller: updateWatcher', 10)
                        let apiResponse = response.generate(true, 'error finding watcher', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result)) {
                        logger.info('No Watcher Found', 'watcherController: deleteWatcher()', 7)
                        let apiResponse = response.generate(true, 'failed to find watcher', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(result)
                    }
                })
        })
    }
    let deleteThisWatcher = (result) => {
        return new Promise((resolve, reject) => {
            let findQuery = {

                $and: [
                    {
                        userId: req.body.userId
                    },
                    {
                        createdForIssueId: req.body.createdForIssueId
                    }
                ]
            }
            WatcherModel.remove(findQuery)
                .exec((err, result1) => {
                    if (err) {
                        logger.error(err.message, 'Watcher Controller: deleteWatcher', 10)
                        let apiResponse = response.generate(true, 'error deleting watcher', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result1)) {
                        logger.info('No Watcher Found', 'watcherController: deleteThisWatcher()', 7)
                        let apiResponse = response.generate(true, 'failed to deleting watcher', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(result1)
                    }
                })
        })
    }
    findWatcher()
        .then(deleteThisWatcher)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'watcher was successfully deleted', 200, resolve)
            res.send(apiResponse)
        }).catch((err) => res.send(err))
}

let getAllWatchersOfPaticularIssueOnInit = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.issueId)) {
                logger.info('issue Id missing', 'watcherController: getAllWatchersOfPaticularIssueOnInit()', 7)
                let apiResponse = response.generate(true, 'issueID parameter is missing', 401, null)
                reject(apiResponse)
            } else {
                resolve(req)
            }
        })
    }

    let findWatchers = (req) => {

        return new Promise((resolve, reject) => {
            WatcherModel.find({
                createdForIssueId: req.params.issueId
            })
                .select()
                .lean()
                .exec((err, result1) => {
                    if (err) {
                        logger.error(err.message, 'Watcher Controller: getAllWatchersOfPaticularIssueOnInit', 10)
                        let apiResponse = response.generate(true, 'error finding watcher', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(result1)) {
                        logger.info('No Watcher Found', 'watcherController: getAllWatchersOfPaticularIssueOnInit()', 7)
                        let apiResponse = response.generate(true, 'No watchers found', 404, null)
                        reject(apiResponse)
                    } else {
                        resolve(result1)
                    }
                })
        })

    }
    validateUserInput()
        .then(findWatchers)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'watchers found', 200, resolve)
            res.send(apiResponse)
        }).catch((err) => res.send(err))
}




module.exports = {
    createWatcher: createWatcher,
    getAllWatchers: getAllWatchers,
    deleteWatcher: deleteWatcher,
    getAllWatchersOfPaticularIssueOnInit: getAllWatchersOfPaticularIssueOnInit
}
