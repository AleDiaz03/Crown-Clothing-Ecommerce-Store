import { createContext, useState, useEffect } from "react";
import {  getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
    setCategoriesMap: () => (null)
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({}) 
    
  
    useEffect(() => {
        // If there is an async step in useEffect, instead of making the
        // parameter an async function, wrap the async part in an async function
        // and call it at the bottom 
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
        
        
    }, [])

    const value = {categoriesMap}

    return (<CategoriesContext.Provider value={value}>
        {children}
    </CategoriesContext.Provider>)
}