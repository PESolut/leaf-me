import React from 'react';
import DispensariesProvider from '../Providers/DispensariesProvider';
import Header from '../components/Header.js';
import DispensaryShowView from '../components/DispensaryShowView.js';
import { useDisProvider } from '../Providers/DispensariesProvider.js';
import NavBar from '../components/NavBar.js';



const DispensariesShow = () => {
    // const { dispensaryShowID, dispensaries } = useDisProvider()


    return (
        <>
        <Header/>
        <DispensaryShowView/>
        <NavBar/>
        </>
    );
};

export default DispensariesShow;