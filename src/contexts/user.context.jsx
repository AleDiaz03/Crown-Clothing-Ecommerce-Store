import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// Actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
    currentUser: null
}

const userReducer  = (state, action) => {
    const {type, payload} = action
    
    switch(type) {
        case 'SET_CURRENT_USER':
            return ({
                currentUser: payload
            })
        default: 
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

// Provider
// Stores the data you want to distribute to nodes
// Actual component
export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)
    const {currentUser} = state
    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }

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

/*
const userReducer = (state, action) => {
    return (
        currentUser: null, 

    )
}
*/