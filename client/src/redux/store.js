import { combineReducers, configureStore } from '@reduxjs/toolkit'

import AdminSlice from './slices/AdminSlice'
import CompanyLoginSlice from './slices/CompanyLoginSlice'

const rootReducer = combineReducers({
    adminLoginSlice: AdminSlice,
    CompanyLoginSlice: CompanyLoginSlice,

})


 const store = configureStore({
  reducer:rootReducer,
})
export default store