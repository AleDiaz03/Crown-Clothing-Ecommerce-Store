import { createContext, useState } from "react";

export const CartContext = createContext  ({
    showing: false,
    setShowing: () => (null)
})

export const CartProvider = ({ children }) => {
    const [showing, setShowing] = useState(false)
    const value = {showing, setShowing}
    
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}