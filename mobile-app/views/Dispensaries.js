import React from 'react';
import DispensariesIndex from '../components/DispensariesIndex';
import DispensariesProvider from '../Providers/DispensariesProvider';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const Dispensaries = () => {

  return (
    <>
      <Header/>
      <DispensariesIndex/>
      <NavBar/>
    </>
  )
  
};

export default Dispensaries;