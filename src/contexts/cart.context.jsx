import { createContext, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer.utils'

const addItem = (cartItems, productToAdd) => {
    
    const existingCartItem = cartItems.find((cartItem) => 
        cartItem.id === productToAdd.id
    )
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    }
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeItem = (cartItems, productToRemove) => {
        const existingCartItem = cartItems.find(
            (cartItem) => cartItem.id === productToRemove.id
        )

        if (existingCartItem.quantity === 1){
            return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
        }

        return cartItems.map((cartItem) => 
        cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
        ) 
}

const deleteItem = (cartItems, productToDelete) => {
    return cartItems.filter(cartItem => cartItem.id !== productToDelete.id)
}

export const CartContext = createContext  ({
    showing: false,
    setShowing: () => (null),
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    totalItems: 0,
    setTotalItems: () => (null),
    deleteItemFromCart: () => {},
    totalPrice: 0,
    setTotalPrice: () => (null)
})




export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_SHOWING: 'SET_IS_SHOWING'
}

const INITIAL_STATE = {
    totalItems: 0,
    totalPrice: 0,
    cartItems: [],
    showing: false
}

 const cartReducer = (state, action) => {
     const {type, payload} = action
     switch(type){
         case 'SET_CART_ITEMS':
             return ({
                 ...state,
                 ...payload
             })
         case 'SET_IS_SHOWING':
             return ({
                 ...state,
                 showing: payload
             })
         default: 
             throw new Error(`unhandled type of ${type} in cartReducer`)
     }
 }




export const CartProvider = ({ children }) => {
    const [{cartItems, showing, totalItems, totalPrice}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        const newTotalPrice = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
        const newTotalItems = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
            cartItems: newCartItems, 
            totalPrice: newTotalPrice, 
            totalItems: newTotalItems
        }))

    }

    const setShowing = (bool) => {
      dispatch(createAction(CART_ACTION_TYPES.SET_IS_SHOWING, bool))
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const deleteItemFromCart = (productToDelete) => {
        const newCartItems = deleteItem(cartItems, productToDelete)
        updateCartItemsReducer(newCartItems)
    }   

    const value = {showing, setShowing, cartItems, addItemToCart, totalItems, removeItemFromCart, deleteItemFromCart, totalPrice}
    //

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}