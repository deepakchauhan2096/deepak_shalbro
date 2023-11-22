export const initAdmin = "account/admin"
export const initCompany = "account/company"
export const initProject = "company/project"
export const selectedCompany = "account/selectedcompany"
export const initEmployee = "company/employee"


export function initAdmin_fun(value){
    return {type:initAdmin,payload:value}
}
export function initCompany_fun(value){
    return {type:initCompany,payload:value}
}
export function selectedCompany_fun(value){
    return {type:selectedCompany,payload:value}
}

export function initProject_fun(value){
    return {type:initProject,payload:value}
}

export function initEmployee_fun(value){
    return {type:initEmployee,payload:value}
}