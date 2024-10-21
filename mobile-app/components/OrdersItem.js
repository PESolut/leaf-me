import React,{useEffect, useState} from 'react';
import { View , Text, Image } from 'react-native';
import { getOneDispensary } from './Functions';
import styles from './OrdersItemStyles.js'


const ordersItem = ({clientUserID, dispensaryID, orderID, status, total, storeItemsDictionary}) => {
    // console.log('ordersItem orderinfo:\n',clientUserID, dispensaryID, orderID, status, total, storeItemsDictionary)
    const [dispensary, setDispensary] = useState({})
    const defaultImage = require('../assets/weeddefault.png')
    let orderItem = {}

    // retrieve the dispensary's info (title, image)
    useEffect(() => {
    const fetchDispensaryData =  async (dispensary_id) => {
        try {
            const dispensaryData = await getOneDispensary(dispensary_id)
            setDispensary(dispensaryData)
        } catch (error) {
            console.error(error)
        }
    }
    fetchDispensaryData(dispensaryID)
    },[dispensaryID])

    // console.log('disState',dispensary.name)

    // retrieve all storeItems relating to this parent order item, to be rendered on the orderItemShow component onPress of aContainer

    // retrieve further details about the item  ( order Store Itemvia reference to storeItems
 
    return (
        <View style={styles.aContainer}>
            {/* <Text>hi</Text> */}
            <View style={styles.aColumn1}>
                <Image style={ {width: 50, height: 50, borderRadius: 25}} source={defaultImage}></Image>
            </View>
            <View style={styles.aColumn2}>
                <Text style={{textAlign: 'center'}}>{ dispensary && dispensary.name}</Text>
                <View style={styles.bContainer}>
                    <View style={styles.bItem}>
                        <Text style={styles.bItemText}> 4 Items</Text>  
                    </View>
                    <View style={styles.bItem}>
                        <Text style={styles.bItemText}>{total && `$${total}`}</Text>  
                    </View>
                    <View style={styles.bItem}>
                        <Text style={styles.bItemText}>2024-05-29</Text>  
                    </View>
                    <View style={styles.bItem}>
                        {/*
                        logic to be implemented:
                            if status = NEW
                                render dispensary processing
                            if status = AWAITING
                                render awaiting pickup
                            if status = PICKED
                                render in route
                            
                        */}
                        <Text style={styles.bItemText}>{status}</Text> 
                    </View>
                </View>
            </View>
            <View style={styles.aColumn3}>
                
            </View>
        </View>
    );
};

export default ordersItem;