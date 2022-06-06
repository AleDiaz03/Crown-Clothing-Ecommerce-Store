import { createContext, useState, useEffect } from "react";


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

export const CartProvider = ({ children }) => {
    const [showing, setShowing] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    
    useEffect(() => {
        // reduce will do the same as instantiating a variable total and looping through array updating total. Takes two arguments
        // Function that takes the name of the variable and a name for each array element (like i in a for loop)
        // Second argument is the initial value of total
        const newTotalItems = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setTotalItems(newTotalItems)
    }, [cartItems])

    useEffect(() => {
        const newTotalPrice = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
        setTotalPrice(newTotalPrice)
    })

    const addItemToCart = (productToAdd) => {
        setCartItems(addItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeItem(cartItems, productToRemove))
    }

    const deleteItemFromCart = (productToDelete) => {
        setCartItems(deleteItem(cartItems, productToDelete))
    }   

    const value = {showing, setShowing, cartItems, setCartItems, addItemToCart, totalItems, setTotalItems, removeItemFromCart, deleteItemFromCart, totalPrice}

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}