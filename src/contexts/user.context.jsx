import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// Actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

// Provider
// Stores the data you want to distribute to nodes
// Actual component
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null) // By default no user logged in
    const value = {currentUser, setCurrentUser}
    
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                 createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })

        // Remember whatever gets returned from this effect will run
        // whenever component is unmounted.
        // unsuscribe is a function thatt onauthstatechange returns
        // and basically when it runs it stops the listener to avoid 
        // memory leaks.
        return unsubscribe
    }, [])
    
    
    return (<UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>)
}