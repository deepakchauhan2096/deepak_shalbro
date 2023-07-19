import {createStore } from 'redux'
import rootReducer from './rootReducer'



const store = createStore(rootReducer)
export default store



// const dummyReducer = () =>{
//     return 100;
// }


// const store = createStore(dummyReducer)
// export default store