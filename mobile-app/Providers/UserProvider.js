import React from 'react';
import { useContextProvider } from './Provider';
import { useContext, createContext, useState, useEffect } from "react"
import { checkIfCurrentUserHasBasket, createNewBasket, populateBasketWithStoreItem, getAllBasketStoreItemsFromBasketID, getAllStoreItems } from '../components/Functions.js';


export const UserContext = createContext()
export function useUserContext() {
    return useContext(UserContext)
}

const UserProvider = ({children}) => {
    const { API, axios, userID } = useContextProvider()
    const [totalItems, setTotalItems] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [basketItems, setBasketItems] = useState([])
    const [basketID, setBasketID] = useState(null)
    const [currentUserHasBasket, setCurrentUserHasBasket] = useState(false)
    const [error, setError] = useState(null)
    const [triggerRerenderFlag, setTriggerRerenderFlag] = useState(null)

    const handleQuantityChange2 = (itemId, newQuantity) => {
        if(itemId && newQuantity){
            console.log('\nQUANTITY CHANGE:\n','itemId:',itemId,"newQuantity:", newQuantity)
        }
        setBasketItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const toggleRerenderFlag = (triggerRerenderFlag) => {
        console.log('rerenderTrigger')
        setTriggerRerenderFlag(!triggerRerenderFlag)
    }


    // whenever the component is first mounted; we need to check for users basket.
    useEffect(() => {
        console.log(userID)
        // check if user has basket, if does; get basket items and save in state to be rendered onto related components
        const fetchBasketID = async (userID) => {
            try {
                const fetchedBasketID = await checkIfCurrentUserHasBasket(userID)
                console.log("\nFetchedBasketID:\n,",fetchBasketID)
                if(fetchedBasketID) {
                    setCurrentUserHasBasket(true)
                    setBasketID(fetchedBasketID)
                    return fetchedBasketID
                }
            } catch (error) {
                setError(err.message)
                setCurrentUserHasBasket(false)
                return false
            }
        }

        const fetchBasketItems = async (basketID, userID) => {
                try {
                    const basketItems = await getAllBasketStoreItemsFromBasketID(basketID, userID)
                    const storeItems = await getAllStoreItems()
                    // console.log(storeItems)
                    // need to get the names of the basketItems...
                    // one call to all storeItems; forEach basketItem, compare basketItem.storeItemID to storeItem.id;
                    /// when there is a match; append storeItem.name onto basketItem
                    const storeItemsMap = {};
                    storeItems.forEach(storeItem => {
                        storeItemsMap[storeItem.id] = storeItem
                    })
                    const itemsWithNamesAndPrices = basketItems.map(item => {
                        const storeItem = storeItemsMap[item.store_item_id]
                        if (storeItem) {
                            item.name = storeItem.name
                            item.price = storeItem.price
                        } else {
                            item.name = 'Unknown Item'
                            item.price = NaN
                        }
                        return item
                    })
                    // retrieving total items + subtotal
                    let tempSubtotal = 0
                    let tempTotalItems = 0
                    itemsWithNamesAndPrices.forEach((item) => {
                        console.log(item.price, item.quantity)
                        tempSubtotal += Number(item.price) * Number(item.quantity)
                        tempTotalItems += 1
                    })

                    // const itemsWithPrice = basketItems.map(item => {
                    //     const storeItem = storeItemsMap[item.price]
                    //     if(storeItem) {
                    //         item.price = storeItem.price
                    //     } else {
                    //         item.price = NaN
                    //     }
                    //     return item
                    // })
                    // console.log(tempSubtotal,tempTotalItems)

                    // format the currency
                    const formatCurrency = async (amount) => {
                        return `$${amount.toFixed(2)}`
                    }

                    let formattedSubtotal =  await formatCurrency(tempSubtotal)
                    console.log(formattedSubtotal)

                    setTotalItems(tempTotalItems)
                    setSubtotal(formattedSubtotal)
                    setBasketItems(itemsWithNamesAndPrices)
                    return true
                } catch (error) {
                    setError(err.message);
                    return false
        }}

   
        const initBasket = async (userID) => {
            const fetchedBasketID = await fetchBasketID(userID);
            if(fetchedBasketID) {
                await fetchBasketItems(fetchedBasketID, userID)
            }
        }
        initBasket(userID)
    },[userID,triggerRerenderFlag])





    return (
        <UserContext.Provider
        value={{
            basketItems, basketID, currentUserHasBasket, error, subtotal, totalItems, setTotalItems, handleQuantityChange2, setBasketItems, setBasketID, setCurrentUserHasBasket, setSubtotal, triggerRerenderFlag, setTriggerRerenderFlag, toggleRerenderFlag
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;