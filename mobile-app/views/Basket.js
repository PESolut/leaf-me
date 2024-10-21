import React from 'react';
import { View } from 'react-native';
import BasketIndex from '../components/BasketIndex';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import BasketSubmitCartButton from '../components/BasketSubmitCartButton';
import BasketAddButton from '../components/BasketAddButton';


const Basket = () => {

    // create add to cart button comp
    // on press, retrieve state of all of basketItems,

    // seperate each order by like dispensary_id's
    // iterate over basketItems;
        // on each el 'order', put like dispensary_id's in its own unique order object
        // go until theres no more orders
        // create order state with this data:
        /*
        total
        status
        client_user_id
        */
    // post each order to the order table
    // populate each order with related storeItems onto orderstoreitems table

    return (
        
        <>
            <Header/>
            <BasketIndex/>
            <NavBar/>
            <BasketSubmitCartButton/>
            <BasketAddButton/>
            
        </>
    );
};

export default Basket;