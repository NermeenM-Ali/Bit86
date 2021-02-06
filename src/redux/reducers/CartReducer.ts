import * as types from '../Type';
const initialState = {
    counter: 0,
    isExist:false,
    inCart:false,
    itemID:0,
    cartItems:[],
   
}


const CartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            return {...state, cartItems:[...state.cartItems, action.payload], isExist:false}
            case types.REPLACE_IN_CART:
                return {...state, cartItems: state.cartItems.map((item:any, index:number)=>{
                    if(item.id === action.payload.id){
                        return item = action.payload
                    }else{
                        return item
                    }
                })}    
        case types.REMOVE_FROM_CART:
            return {...state, cartItems: state.cartItems.filter((item:any, index:number)=> item.id !==action.payload )}    
        case types.INCREASE_COUNTER:
            return { ...state, counter: ++state.counter }
        case types.DECREASE_COUNTER:
            return { ...state, counter: --state.counter }
        case types.CART_CHANGE_PROPS:
            return { ...state, [action.prop]: action.value }
        default:
            return state;
    }
}

export default CartReducer;