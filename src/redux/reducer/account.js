import {initAdmin,initCompany,selectedCompany} from "../action/index.js"

export function accountReducer(state={},action){
    switch (action.type) {
        case initAdmin:
                return {...state,['accountAdmin']:action.payload}
        case initCompany:
                return {...state,['accountCompany']:action.payload}
        case selectedCompany:
                return {...state,['selectedCompany']:action.payload}
        default:
                return state
    }
}