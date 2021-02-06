import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import CartReducer from './reducers/CartReducer';



// every reducers in the project
const reducers = combineReducers({
    CartReducer: CartReducer,
})


const store = createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

export {store}