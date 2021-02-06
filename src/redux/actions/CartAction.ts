import { Category } from '../../screens/HomeScreen';
import * as types from '../Type';

export const addToCart = (item:any) => {

    return (dispatch: any) => {
        dispatch({type: types.ADD_TO_CART, payload:item})
    }
} 

export const replaceInCart = (item:any) => {
    return (dispatch: any) => {
        dispatch({type: types.REPLACE_IN_CART, payload:item})
    }
} 

export const removeFromCart = (id:any) => {
    return (dispatch: any) => {
        dispatch({type: types.REMOVE_FROM_CART, payload:id})
    }
} 


export const increaseCounter = () => {
    return (dispatch: any) => {
        dispatch({type: types.INCREASE_COUNTER})
    }
} 

export const decreaseCounter = () => {
    return (dispatch: any) => {
        dispatch({
            type: types.DECREASE_COUNTER
        })
    }
}

export const changePropCart= (prop: any, value: any) => {
    return {
        type: types.CART_CHANGE_PROPS,
        prop,
        value
    }
}









