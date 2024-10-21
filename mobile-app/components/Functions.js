import { API } from '../Providers/Provider'
import axios from 'axios'

/**
 * retrieves all the storeItems. used to retrieve storeItems names for BasketItems and OrderItems tables.
 * @returns {<Array><Object>}
 */
const getAllStoreItems = async () => {
    try {
        res = await axios.get(`${API}/allstoreitems`)
        const allStoreItems = res.data
        return allStoreItems
    } catch (error){
        console.error(error)
        return null
    }
}

/**
 * Checks if the specified user has a basket.
 *
 * @param {Number} userID - The ID of the user to check for a basket.
 * @param {Boolean|null} all - Optional parameter. When set to true, returns all basket IDs. Use for testing or if a user has multiple baskets.
 * @param {Boolean|null} obj - Optional parameter. When set to true, returns basket objects instead of IDs.
 * @returns {Number|null|Array<Number>|Array<Object>} Returns the basket ID if the user has one, null if there's no basket for the user, an array of basket IDs if 'all' parameter is true, or an array of basket objects if 'obj' parameter is true.
 */
const checkIfCurrentUserHasBasket = async (userID,all=null,obj=null) => {
    // make call to api
    // https://leaf-me-0183706079ed.herokuapp.com/users/{UserIDHERE}}/basket/
    try {
        const res = await axios.get(`${API}/users/${userID}/basket`)
        if(all){
            let baskets = res.data
            console.log(baskets)
            if(obj){
                return baskets
            } else {
                const basketIDs = baskets.map(basket => {
                    return basket.id
                });
                return basketIDs
            }
        } else {
            // if obj param is present, return the whole arr
            if(obj){
                let baskets = res.data
                return baskets
            } else {
                const basketID = res.data[0].id
                return basketID

            }
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

/**
 * populates a new basket in relation to the input user
 * @param {Number} userID - the id of the user who's basket is being created
 * @returns {Number|null} Returns the basket id or null if there's an error

 */
const createNewBasket = async (userID) => {
    // make call to api
    try {
        const res = await axios.post(`${API}/users/${userID}/basket`, {
            client_user_id: userID
        })
        return res.data.id
    } catch (error) {
        console.error(error)
        return null
    }
}

/**
 * retrives all the basketStoreItems from the input basket
 * @param {Number} basketID - the id of the basket to retrive basketStoreItems from
 * @param {Number} userID - the id of the baskets parent user
 * @returns {Promise<Array><Object>>} - a promise that resolves to an array of store item objects.
 */
const getAllBasketStoreItemsFromBasketID = async (basketID,userID) => {
    // check that input is provided
    if(!basketID){
        throw new Error('Basket ID is required!')
    }
    let basketIDNumber = Number(basketID)
    // if the input is NaN
    if(isNaN(basketIDNumber)){
        throw new Error('Basket ID must be a number!')

    }
    // try to make the api call
    try {
        const res = await axios.get(`${API}/users/${userID}/basket/${basketIDNumber}/storeitems`)
        return res.data
    } catch (error) {
        console.error('Error fetching basket store items: ', error)
        throw error
    }

}

/**
 * populates a user's basket with a store item
 * @param {Number} basketID - The ID of the basket to populate
 * @param {Number} userID - The ID of the user owning the basket
 * @param {Number} dispensaryID - The ID of the dispensary where the store item is located ( Unused atm )
 * @param {Number} storeItemID - The ID of the store item to add to the basket
 * @param {Number} quantity - the amount of store items that are being added on to the basket
 * @returns {Boolean} True if the store item is successfully added to the basket, otherwise false
 */
const populateBasketWithStoreItem =  async (basketID,userID,dispensaryID,storeItemID,quantity) => {
    try {
        const res = await axios.post(`${API}/users/${userID}/basket/${basketID}/storeItems`, {
            quantity: quantity,
            basket_id: basketID,
            store_item_id: storeItemID
        })
        return true;
    } catch (error) {
        console.error(error);
        return false
    }
}
/**
 * Iterates over the input unsorted basketItems array and returns an array of objects,
 * each containing store items sorted by their unique dispensary ID along with additional
 * order information (total, status, client_user_id, dispensary_id).
 * basket items are also returned in the items key which makes it easier to populate the orderStoreItems table once the order is created
 * This is used to prepare a basket to be sent to the backend, containing store items from multiple dispensaries.
 *
 * @param {Array} basketItems - The unsorted array of basket items, where each item is an object containing at least a dispensary_id and other item details.
 * @param {number} order.total - The total amount for the order.
 * @param {string} order.status - The status of the order.
 * @param {string} order.client_user_id - The client user ID associated with the order.
 * @param {Array} [storeItems] - (Optional) The array of store items for reference. Only provide this if the store items change.
 * @returns {Array} An array of objects, where each object represents a unique dispensary and contains its associated store items and order information.
 *
 * @example
 * const basketItems = [
 *   { id: 1, name: 'Item 1', dispensary_id: 'A' },
 *   { id: 2, name: 'Item 2', dispensary_id: 'B' },
 *   { id: 3, name: 'Item 3', dispensary_id: 'A' }
 * ];
 * const orderInfo = {
 *   total: 100,
 *   status: 'pending',
 *   client_user_id: 'user123'
 * };
 * const sortedBasket = sortBasketItemsByDispensary(basketItems, orderInfo);
 * console.log(sortedBasket);
 * // Output:
 * // [
 * //   {
 * //     dispensary_id: 'A',
 * //     items: [
 * //       { id: 1, name: 'Item 1', dispensary_id: 'A' },
 * //       { id: 3, name: 'Item 3', dispensary_id: 'A' }
 * //     ],
 * //     total: 100,
 * //     status: 'pending',
 * //     client_user_id: 'user123'
 * //   },
 * //   {
 * //     dispensary_id: 'B',
 * //     items: [
 * //       { id: 2, name: 'Item 2', dispensary_id: 'B' }
 * //     ],
 * //     total: 100,
 * //     status: 'pending',
 * //     client_user_id: 'user123'
 * //   }
 * // ]
 */
const sortBasketItemsByDispensary = (basketItems,order,
    storeItems=[
       {
           "id": 1,
           "name": "Item 1",
           "type": "flower",
           "image": "item1.jpg",
           "description": "Description for Item 1",
           "price": "9.99",
           "dispensary_id": 1
       },
       {
           "id": 2,
           "name": "Item 2",
           "type": "edible",
           "image": "item2.jpg",
           "description": "Description for Item 2",
           "price": "12.99",
           "dispensary_id": 1
       },
       {
           "id": 3,
           "name": "Item 3",
           "type": "flower",
           "image": "item3.jpg",
           "description": "Description for Item 3",
           "price": "6.99",
           "dispensary_id": 2
       }
   ]) => {
   const batchOfOrders = []
   let count = 0

   const retrieveDispensaryID = (storeItemID, storeItems) => {
       for(let i = 0; i < storeItems.length; i++){
           let item = storeItems[i]
           if(storeItemID == item.id){
               return item.dispensary_id
           }
       }
   }

   for(let i = 0; i < basketItems.length; i++){
       const basketItem = basketItems[i]
       // get the dispensaryID of the current basketItem by referencing basketItem.store_item_id to storeItems[k].id
       const dispensaryID = retrieveDispensaryID(basketItem.store_item_id, storeItems)
       
       // if theres null from the find method; we create a new orderEl then push to returnArr
       let orderEl = batchOfOrders.find(order => order.dispensary_id === dispensaryID);
       if(!orderEl){
           orderEl = {
               dispensary_id: dispensaryID,
               items: [],
                   total: 0,
                   status: order.status,
                   client_user_id: order.client_user_id
               }
           batchOfOrders.push(orderEl)
       }
       
       // append basket item to orders item key
       orderEl.items.push({
           quantity: basketItem.quantity,
           basket_id: basketItem.basket_id,
           store_item_id: basketItem.store_item_id
       })
       // update total of order
       const storeItem = storeItems.find(item => item.id === basketItem.store_item_id)
       if(storeItem) {
           orderEl.total += parseFloat(storeItem.price) * basketItem.quantity
       }
   }
   if(batchOfOrders.length == 1){
    return batchOfOrders[0]
   }
   return batchOfOrders
}
/**
 * validate that the input object has all the valid keys required for orders post
 * @param {Object} obj - order object formatted for post
 * @returns {string|null} - A string indicating missing keys, or null if all keys are present.
 */
const validateOrderKeys = (obj) => {
    let missingKeys = ''

    // checking each key
    switch(true) {
        case !('total' in obj):
            missingKeys += 'total'
        case !('status' in obj):
            missingKeys += 'status'
        case !('client_user_id' in obj):
            missingKeys += 'client_user_id'
        case !('dispensary_id' in obj):
            missingKeys += 'dispensary_id'
    }

    // removing trailing commas
    missingKeys = missingKeys.replace(/,\s*$/, '');

    //if there is missing keys, return a string, otherwise return null
    if(missingKeys) {
        return `Missing Keys: ${missingKeys}`
    } else {
        return null
    }
    
}

/**
 * post single order to backend. takes in a sortedBasketItem Object (sortedBaskedItems[n]) this should be chained along with the return from the sortBasketItemsByDispensary call
 * @param {String} order.total - The cash value of the order
 * @param {String} order.status - indicates the orders status for use on the courier and resturant Frontend
 * @param {Number} order.client_user_id - the id of the user that the order belongs to
 * @param {Number} order.dispensary_id - the id of the dispensary to which the order belongs to
 * @returns {Promise<Array><Object>>} - returns the object with the posted order object
 */
const postSingleOrder = async (order) => {
    console.log('ssingleOrder',order)
    if(typeof(order) !== 'object'){
        throw new Error('supplied input is not an object')
    }

    const missingKeys = validateOrderKeys(order)
    if (missingKeys){
        throw new Error('supplied input is invalid:\n',missingKeys)
    }

    console.log(' preObject builder')

    const orderObj = {
        total: order.total,
        status: order.status,
        client_user_id: order.client_user_id,
        dispensary_id: order.dispensary_id
    }
    console.log(orderObj)
    try {
        console.log('preSend',`${API}/user/${order.client_user_id}/order`)
        const res = await axios.post(`${API}/users/${order.client_user_id}/order`,orderObj)
        console.log('response!!!',res.data.id)
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
/**
 * validate that the input object has all the valid keys required for orderStoreItem post
 * @param {Object} obj - orderStoreItem object formatted for post
 * @returns {string|null} - A string indicating missing keys, or null if all keys are present.
 */
const validateStoreItemKeys = (obj) => {
    let missingKeys = ''

    // checking each key
    switch(true) {
        case !('total' in obj):
            missingKeys += 'quantity'
        case !('status' in obj):
            missingKeys += 'basket_id'
        case !('client_user_id' in obj):
            missingKeys += 'store_item_id'
    }

    // removing trailing commas
    missingKeys = missingKeys.replace(/,\s*$/, '');

    //if there is missing keys, return a string, otherwise return null
    if(missingKeys) {
        return `Missing Keys: ${missingKeys}`
    } else {
        return null
    }
    
}
/**
 * Posts a single orderStoreItem to the backend.
 * @param {Number} orderID - order id of the parent
 * @param {Number} client_user_id - user ID of the order's owner
 * @param {Object} storeItem - The storeItem object containing the following keys:
 * @param {number} storeItem.quantity - The quantity of the store item.
 * @param {string} storeItem.basket_id - The ID of the basket.
 * @param {string} storeItem.store_item_id - The ID of the store item.
 * @returns {Promise<Object>} A Promise that resolves with the response from the backend if the operation is successful.
 * @throws {Error} If an error occurs during the POST request or if the response indicates an error.
 */
const postOrderStoreItem = async (storeItem, orderID, client_user_id) => {
    console.log('stophere',storeItem, orderID, client_user_id)
    if(typeof(storeItem) !== 'object'){
        throw new Error('supplied input is not an object')
    }
    // const missingKeys = validateStoreItemKeys(storeItem)
    // if (missingKeys){
    //     throw new Error('supplied input is invalid:\n',missingKeys)
    // 
    console.log(orderID)
    try {
        console.log('clientID',client_user_id,'orderID',orderID)
        storeItem.client_order_id = orderID
        const res = await axios.post(`${API}/users/${client_user_id}/order/${orderID}/storeitems`,storeItem)
            console.log('postOrderItem()',res.data)
            return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

/**
 * Posts a batch of orders to the backend. To be used in conjunction with the sortBasketItemsByDispensary function.
 * @param {Array<Object>} batchOfOrders - An array of sorted BasketItems objects from the return of sortBasketItemsByDispensary, to be posted to the orders table.
 * @param {Array<Object>} batchOfOrders[].items - An array of basketStoreItem objects, to be posted to the orderStoreItem table.
 * @param {number} batchOfOrders[].dispensary_id - ID of the related dispensary, to be posted to the orders table.
 * @param {string} batchOfOrders[].total - Value for the cost of the entire order, to be posted to the orders table.
 * @param {string} batchOfOrders[].status - Status of the order, to be posted to the orders table.
 * @param {number} batchOfOrders[].client_user_id - ID of the related client user, to be posted to the orders table.
 * @returns {Promise<Object>} A Promise that resolves to an object containing all the orders' IDs posted and all the IDs of all orderStoreItems posted.
 * @throws {Error} If an error occurs during any of the POST requests or if any response indicates an error.
 */
const postBatchOrder = async (batchOfOrders, userID) => {
    const result = {
        orderIds: [],
        orderStoreItemIds: []
    }

    let _orderID = null

    for(const order of batchOfOrders){
        try {
            // post each order to orders table
            const orderResponse = await postSingleOrder(order)
            console.log('orderRes',orderResponse)
            _orderID = orderResponse.id
            result.orderIds.push(_orderID)

            // post each item to the orderStoreItem table
            for(const item of order.items) {

                console.log ('is orderID good precall?',_orderID)
                const itemResponse = await postOrderStoreItem(item, _orderID, userID)
                console.log('itemResponse',itemResponse, _orderID, userID)
                result.orderStoreItemIds.push(itemResponse.id)
            }
            result.orderStoreItemIds.push('end')
        } catch (error){
            console.error(error)
            throw error;
        }
    }
    console.log(result)
    return result

}

/**
 * takes in a single basketStoreItem ID and then deletes from the db
 * @param {Number} basketStoreItemID - ID of the basketStoreItem to be deleted
 * @param {Number} userID - ID of the owner of the basketStoreItem
 * @param {Number} basketID - ID of the parent of basketStoreItem
 * @returns {True|null} - if the delete was succesful, return true, otherwise return null
 */
const deleteOneBasketStoreItem = async (basketStoreItemID, userID, basketID) => {
    try {
        const res = await axios.delete(`${API}/users/${userID}/basket/${basketID}/storeitems/${basketStoreItemID}`)
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}
/**
 * takes in a single basket ID and then deletes from the db
 * @param {Number} basketID - ID of the basket to be deleted
 * @param {Number} userID - ID of the owner of the basketStoreItem
 * @returns {True|null} - if the delete was succesful, return true, otherwise return null
 */
const deleteOneBasket = async (basketID, userID) => {
    try {
        const res = await axios.delete(`${API}/users/${userID}/basket/${basketID}`)
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}


/**
 * takes in a usersID and deletes all basket and basketStoreItems for the user.
 * @param {Number} userID - the userID of the user that ALL baskets and basketStoreItems will be deleted.
 * @return {True|null} - if the call was succesful, return true, otherwise return null
 */
const deleteAllUserRelatedBaskets = async (userID) => {
    let flag = null
    // get all users baskets
    const basketIDs = await checkIfCurrentUserHasBasket(userID, true, null)
    const baskets = await checkIfCurrentUserHasBasket(userID, true, true)
    console.log('baskets:\n',baskets,'\nbasketIds\n',basketIDs)

    // get all store items for baskets
    for (const basket of baskets) {
        const basketID = basket.id
        const storeItems = await getAllBasketStoreItemsFromBasketID(basketID,userID)
        for(const item of storeItems) {
            const itemID = item.id
            const res = await deleteOneBasketStoreItem(itemID,userID,basketID)
            if(!res.data){
                flag = false
            }
        }
        // with all the storeItems gone, finally delete the basket
        const res = await deleteOneBasket(basketID, userID)
        if(!res.data){
            flag = false
        }
    }
    return true
}


/**
 * Represents an order.
 * @typedef {Object} Order
 * @property {string} orderId - The ID of the order.
 * @property {string} productName - The name of the product.
 * @property {number} quantity - The quantity of the product ordered.
 */
/**

/**
 * 
 * @param {Number} userID - the user ID of the user to retrieve the orders from.
 * @return {<Array>Order|null}- returns an array of Order objects or null
 */
const getUsersOrders = async (userID) => {
    try {
        const res = await axios.get(`${API}/users/${userID}/order`)
        // console.log('ress',res.data)
        return res.data
        
    } catch (error) {
        console.error(error)
        return null
    }
}

/**
 * get one dispensary by id
 * @param {Number} dispensaryID - the dispensaryID of dispensary to get.
 * @return {Object|null} - returns a Dispensary Object
 */
const getOneDispensary = async (dispensaryID) => {
    // console.log('getOneDispensary',`${API}/dispensary/${dispensaryID}`)

    try {
        
        const res = await axios.get(`${API}/dispensary/${dispensaryID}`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export { 
    checkIfCurrentUserHasBasket,
    createNewBasket,
    populateBasketWithStoreItem,
    getAllBasketStoreItemsFromBasketID,
    getAllStoreItems,
    sortBasketItemsByDispensary,
    postBatchOrder,
    postSingleOrder,
    postOrderStoreItem,
    deleteAllUserRelatedBaskets,
    deleteOneBasket,
    deleteOneBasketStoreItem,
    getUsersOrders,
    getOneDispensary

}