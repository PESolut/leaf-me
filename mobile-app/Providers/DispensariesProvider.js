import React from 'react';
import { useContextProvider } from "./Provider.js";
import { useContext, createContext, useState, useEffect } from "react";

export const DisContextD = createContext();
export function useDisProvider() {
  return useContext(DisContextD);
}

const DispensariesProvider = ({children}) => {
    const { API, axios } = useContextProvider();
    const [dispensaries, setDispensaries] = useState([])
    const [dispensaryID, setDispensaryID] = useState(null)
    const [dispensaryItems, setDispensaryItems] = useState({}) 
    const [dispensaryShowID, setDispensaryShowID] = useState(null)
    


    useEffect(() => {
        console.log(`${API}/dispesnary`)
        axios
            .get(`${API}/dispensary`)
            .then(({ data }) => {
                setDispensaries(data)
                console.log('Dispensaries Provider - populated dispensaries state with API response')
            })
            .catch((error) => console.error(error))
    },[dispensaryID]);

    const setActiveDispensaryID = (dispensaryID) => {
        setDispensaryShowID(dispensaryID)
    }


    return (
            <DisContextD.Provider
            value={{
                API,
                axios,
                dispensaries,
                setDispensaries,
                dispensaryID,
                setDispensaryID,
                dispensaryItems,
                setDispensaryItems,
                dispensaryShowID,
                setDispensaryShowID,
                setActiveDispensaryID
            }}>
            {children}
            </DisContextD.Provider>  
    );
};

export default DispensariesProvider;