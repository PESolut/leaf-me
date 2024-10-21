import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import ShowItemShow from '../components/StoreItemShow.js'

const StoreItemShowView = () => {
    return (
        <>
        <Header/>
            <ShowItemShow/>
        <NavBar/>
        </>
    );
};


export default StoreItemShowView;