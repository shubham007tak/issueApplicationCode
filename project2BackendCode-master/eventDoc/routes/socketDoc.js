
/**
 * @apiGroup Events-to-listen
 * @api verifyUser verifyUser
 * 
 * @apiDescription This event ("verifyUser") has to be listened on the user's end to verify user authentication.
 * user will only be set as online user after verification of authentication token.
*/

/**
 * @apiGroup Events-to-listen
 * @api onlineuserlist online-user-list
 * 
 * @apiDescription  This event ("online-user-list") has to be listened on the user's end to identify all available users that are currently online.
 * All available users can be shown to the user based on which user can be selected for issue.
*  The output will be an object, object has key as userId and value as full name.
*/

/**
 * @apiGroup Events-to-listen
 * @api error-occurred error-occurred
 * 
 * @apiDescription  This event ("auth-error") has to be listened to identify an error which will occur when the data is not sent properly in the events to be emitted.
 * Example output it as follows:
 * @apiExample {object} Response:
   * { 
      
           status: 123,
            error: 'error message'
 
       
}
*/


/**
 * @apiGroup Events-to-listen
 * @api userId userId
 * 
 * @apiDescription This event's name is actually dynamic and refers to the userId of the logged in user.
 * This event ("userId") has to be listened to identify a issue notification that has been received.
 * Example output it as follows:
 * @apiExample {object} Response:
   * { 
      
        message: 'message to send',
        userId: 'userId of the user for which issue has been created'
}
  
 */

/**
 * @apiGroup Events-to-listen
 * @api disconnect disconnect (optional)
 * 
 * @apiDescription This event ("disconnect") has to be listened, when the user is disconnected to show proper message.
*/

/**
 * @apiGroup Events-to-emit
 * @api set-user set-user
 * 
 * @apiDescription This event ("set-user") has to be emitted when a user comes online.
 * User can only be set as online only after verification of authentication token. Which you have pass here. The following data has to be emitted
 * authentication token
 */

 /**
 * @apiGroup Events-to-emit
 * @api notify-updates notify-updates
 * 
 * @apiDescription This event ("notify-updates") has to be emitted whenever user creates or updates a issue.
 * Users can only be given notification  after sending data which you have pass here. The following data has to be emitted
 * @apiExample {object} Response:
   * { 
      
        message: 'message to send',
        userId: 'userId of the user for which issue has been created'
        issueId: 'issueId of the issue which has been changed'
 
       
} 
 */

  /**
 * @apiGroup Events-to-emit
 * @api watcher-updates watcher-updates
 * 
 * @apiDescription This event ("watcher-updates") has to be emitted whenever any issue has been changed.
 * Users can only be given notification  after sending data which you have pass here. The following data has to be emitted
 * @apiExample {object} Response:
   * { 
      
        message: 'message to send',
        userId: 'userId of the user for which issue has been created'
        issueId: 'issueId of the issue which has been changed'
       
} 
 */


/**
 * @apiGroup Events-to-emit
 * @api disconnect disconnect
 * 
 * @apiDescription This event ("disconnect") has to be emitted, when the user wants to disconnect.
 * 
*/
