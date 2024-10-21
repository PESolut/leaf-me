import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useContextProvider } from '../Providers/Provider';
import { getUsersOrders } from '../components/Functions.js'
import OrdersIndex from '../components/OrdersIndex.js'
import OrdersItem from '../components/OrdersItem.js';
import Header from '../components/Header.js';
import NavBar from '../components/NavBar.js';

const Orders = () => {
    const { userID } = useContextProvider()
    const [completeOrders, setCompleteOrders] = useState(null)
    const [pendingOrders, setPendingOrders] = useState(null)

    /* EXAMPLE ORDER OBJ
     {"client_user_id": 1, "dispensary_id": 1, "id": 66, "status": "NEW", "total": "541.47"}
    */

    // Helpers
    const fetchUsersOrders = async (userID) => {
        const orders = await getUsersOrders(userID)
        // now sort
        sortOrdersByCompleteOrOther(orders)
    }
    const sortOrdersByCompleteOrOther = (orders) => {
        const tempCompleteOrders = orders.filter((order)=> order.status === "COMPLETE" )
        const tempPendingOrders = orders.filter((order)=> order.status !== "COMPLETE")
        console.log('\nsortOrdersByCompleteOrOther\ncomplete Orders:\n',tempCompleteOrders,'\nPending Orders:\n',tempPendingOrders)
        setCompleteOrders(tempCompleteOrders)
        setPendingOrders(tempPendingOrders)
        console.log('\x1b[34m%s\x1b[0m','pendingOrders\n')
        console.log(tempPendingOrders)
        console.log('\x1b[34m%s\x1b[0m','completeORders\n')
        console.log(tempCompleteOrders)

    }

    // Hooks
    useEffect(() => {
        fetchUsersOrders(userID)
    },[userID])

    // Logic

    return (
        <View>
            <Header/>
                <OrdersIndex pendingOrders={pendingOrders} completedOrders={completeOrders}/>
                {/* This is to position the navbar at the correct location, may need tweaking to work with all devices by using dimensions object provided by react native*/}
                <View style={{marginBottom: 75,}}></View> 
            <NavBar/>
        </View>
    );
};

export default Orders;