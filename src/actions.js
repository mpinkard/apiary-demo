import superagent from 'superagent'
import request from 'superagent-bluebird-promise'


export const FIND_QUIZ = 'FIND_QUIZ'
export const ADD_QUESTION = 'ADD_QUESTION'

export function errorAction(actionName) {
    return actionName + '_ERROR'
}

export function successAction(actionName) {
    return actionName + '_SUCCESS'
}

export function handleSuccess(dispatch, res, action, actionData) {
    if (action) dispatch({ type : successAction(action), value : res.body, actionData })
    return Promise.resolve(res.body)
    }

export function handleError(dispatch, err, action) {
    if (action) dispatch({ type : errorAction(action), value : err })
    if (err.status === 401) dispatch({ type : errorAction(AUTHENTICATE_ERROR_ACTION), value : err })
    return Promise.reject(err)
}

function handleLoading(dispatch, action) {
    if (action) dispatch({ type : action })
}

export function findQuiz() {
    return function (dispatch) {
        handleLoading(dispatch, action)
    
        return request
            .get(`http://private-7bae7-demo679.apiary-mock.com/questions`)
            .then(res => handleSuccess(dispatch, res, action, actionData))
            .catch(err => handleError(dispatch, err, action))
    }
}
    
export function createQuetion() {

}