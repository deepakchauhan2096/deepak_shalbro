import axios from "axios"

export const initAdmin = "account/admin"
export const initCompany = "account/company"
export const selectedCompany = "account/selectedcompany"


export function initAdmin_fun(value){
    return {type:initAdmin,payload:value}
}
export function initCompany_fun(value){
    return {type:initCompany,payload:value}
}
export function selectedCompany_fun(value){
    return {type:selectedCompany,payload:value}
}