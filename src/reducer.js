import {DECREASE, INCREASE, CLEAR_CART, REMOVE, GET_TOTALS, TOGGLE_AMOUNT} from './actions';
import cartItems from './cart-items';

// initial store
const initialStore = {
    cart: cartItems,
    total: 0,
    amount: 0
  };

function reducer(state = initialStore, action){
    if(action.type === CLEAR_CART){
        return {...state, cart: [], total: 0};
    }

    if(action.type === DECREASE){
        let tempCart = state.cart.map(item => {
            if(item.id === action.payload.id){
                item = {...item, amount: item.amount - 1};
            }
            return item;
        });
        return {...state, cart: tempCart};
    }

    if(action.type === REMOVE){
        return {...state, cart: state.cart.filter(item => item.id !== action.payload.id)};
    }

    if(action.type === GET_TOTALS){
        let {total, amount} = state.cart.reduce((cartTotal, cartItem) => {
            const {price, amount} = cartItem;
            const itemTotal = price * amount;

            cartTotal.total += itemTotal;
            cartTotal.amount += amount;

            return cartTotal;
        }, {total: 0, amount:0});
        total = parseFloat(total.toFixed(2));
        return {...state, total, amount};
    }

    if(action.type === INCREASE){
        let tempCart = state.cart.map(item => {
            if(item.id === action.payload.id){
                item = {...item, amount: item.amount + 1};
            }
            return item;
        });

        return {...state, cart: tempCart};
    }

    if(action.type === TOGGLE_AMOUNT){
        return {
            ...state,
            cart: state.cart.map(cartItem => {
              if(cartItem.id === action.payload.id){
                  if(action.payload.toggle === 'inc'){
                      return cartItem = {...cartItem, amount: cartItem.amount + 1};
                  }
                  if(action.payload.toggle === 'dec'){
                      return cartItem = {...cartItem, amount: cartItem.amount - 1};
                  }
              }
              return cartItem;
            })
        }
    }

    return state;
  }

  export default reducer;