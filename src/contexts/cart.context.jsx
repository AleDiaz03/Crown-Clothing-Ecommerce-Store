import { createContext, useState } from "react";


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

export const CartContext = createContext  ({
    showing: false,
    setShowing: () => (null),
    cartItems: [],
    addItemToCart: () => {},
    totalItems: 0,
    setTotalItems: () => (null)
})

export const CartProvider = ({ children }) => {
    const [showing, setShowing] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    
    

    const addItemToCart = (productToAdd) => {
        setTotalItems(totalItems + 1)
        setCartItems(addItem(cartItems, productToAdd))
    }

    const value = {showing, setShowing, cartItems, addItemToCart, totalItems, setTotalItems}

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}