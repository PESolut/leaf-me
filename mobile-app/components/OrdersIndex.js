import React, {useEffect, useState} from 'react';
import { View, FlatList, Text } from 'react-native';
import OrdersItem from './OrdersItem';
import styles from './OrdersIndexStyles.js';
import { getAllStoreItems, getOneDispensary } from './Functions';



const ordersIndex = ({pendingOrders, completedOrders}) => {
    const [storeItems, setStoreItems] = useState({})
    const [storeItemsArr, setStoreItemsArr] = useState([])

    const renderItem = ({item}) => {
        // console.log('rendering this item\n',item,'\n')
        return (
            <OrdersItem clientUserID={item.client_user_id} dispensaryID={item.dispensary_id} orderID={item.id} status={item.status} total={item.total} storeItemsDictionary={storeItems} />
        )
    }

    // retrieve the storeItems , set into dictionary. this is needed for reference inside of orders item
    // 
    // first fetching the storeItems, storing in state
    const fetchStoreItems = async () => {
        const tempStoreItems = await getAllStoreItems()
        setStoreItemsArr(tempStoreItems)
    }
    // now to set the items into a dictionary
    useEffect(()=> {
    let storeItemsDictionary = {}
    fetchStoreItems()
    console.log('storeItemsArr',storeItemsArr)
        for( item of storeItemsArr) {
            console.log(item)
            storeItemsDictionary[item.id] = item
            setStoreItems(storeItemsDictionary)
        }
    },[])
    
    console.log('storeItems',storeItems)

    return (
        <View style={styles.viewContainer}>
            <Text style={styles.pendingH}>Pending Orders</Text>
            <View style={styles.pendingContainer}>
            {
                pendingOrders ?
                <FlatList
                data={pendingOrders}
                renderItem={renderItem}
                keyExtractor={(pendingOrder)=> pendingOrder.id }
                />
                : <Text>None</Text>
            }
            </View>
            <Text style={styles.pendingH} >Complete Orders</Text>
            <View style={styles.completeContainer}>
            {
                completedOrders ?
                <FlatList
                data={completedOrders}
                renderItem={renderItem}
                keyExtractor={(completeOrder)=> completeOrder.id }
                />
                : <Text>None</Text>
            }
            </View>
        </View>
    );
};

export default ordersIndex;