import {initAdmin,initCompany,selectedCompany,initProject,initEmployee} from "../action/index.js"

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


export function projectReducer(state={},action){
        switch (action.type) {
            case initProject:
                    return {...state,['Projects']:action.payload}

            default:
                    return state
        }
    }


 export function employeeReducer(state={},action){
        switch (action.type) {
            case initEmployee:
                    return {...state,['Employees']:action.payload}

            default:
                    return state
        }
    }