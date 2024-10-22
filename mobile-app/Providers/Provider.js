import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';


export const ContextD = createContext();

export function useContextProvider() {
    return useContext(ContextD);
  }

const API = API_URL
console.log(API)

  
const Provider = ({ children }) => {
  const [authToken, setAuthToken] = useState('abcdtoken');
  const [userID, setUserID] = useState('1');

  return (
    <ContextD.Provider
      value={{
        authToken,
        userID,
        API,
        axios,
      }}
    >
      {children}
    </ContextD.Provider>
  );
};

export { Provider, API, axios }

export default Provider;
