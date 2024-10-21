import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useUserContext } from '../Providers/UserProvider';
import styles from './BasketSubmitCartButtonStyles';
import { useContextProvider } from '../Providers/Provider';
import {  postSingleOrder, postBatchOrder, postOrderStoreItem, sortBasketItemsByDispensary, deleteAllUserRelatedBaskets } from './Functions.js'

const BasketSubmitCartButton = () => {
    const navigation = useNavigation();
    const { userID } = useContextProvider()
    const { setBasketItems, setBasketID, setSubtotal, setTotalItems, setCurrentUserHasBasket } = useUserContext()
    // const [batchOfOrders, setBatchOfOrders] = useState([])
    console.log('basket function user', userID)

    const handleSubmit = async () => {
        let successFlag = false

        // preparing order object
        let orderInfo = {
            total: null, // not needed, need to update function's jsdocs
            status: 'NEW',
            client_user_id: userID,
        }

        // sorting basket Items 
       let orders = await sortBasketItemsByDispensary(basketItems, orderInfo)
       if(orders.length > 1 && !(orders.length <= 0)){
        const result = await postBatchOrder(orders, userID)
        console.log('orders posted:',result.orderIds.length,'\nstoreItems posted:',result.orderStoreItemIds.length)
        if(result.orderIds){
            successFlag = true
        }

       } else if (!(orders.length <=  0)){
        let dispensaryID = orders.items[0].dispensary_id
        const responseOrder = await postSingleOrder(orders)
        let orderID = responseOrder.data.id
        const responeStoreItem = await postOrderStoreItem(orders, orderID, userID)
        console.log('goodResult if not undf',responeStoreItem.id)
        if(responeStoreItem.id){
            successFlag = true
        }

        console.log(responeStoreItem)
       }

       
       console.log(successFlag,'if true, success!')
       const res = await deleteAllUserRelatedBaskets(userID)
       if (!res.data){
           successFlag = false
        }
        //reset all states pertaining to basket
       setBasketItems([])
       setBasketID(null)
       setSubtotal(0)
       setTotalItems(0) 
       setCurrentUserHasBasket(false)

       // navigate to dispensaries / ! \ replace with orders screen
       navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Dispensaries' }],
        }))
    }


    return (
        <TouchableOpacity style={styles.container} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Order</Text>
        </TouchableOpacity>
    );
};

export default BasketSubmitCartButton;