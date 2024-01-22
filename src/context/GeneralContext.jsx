import React, { useState } from 'react';
import { createContext } from 'react';

const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [restaurnatName, setRestaurantName] = useState('');
  const [restaurnatLogo, setRestaurantLogo] = useState(null);
  const [restaurnatHouseNumber, setRestaurantHouseNumber] = useState('');
  const [restaurnatStreetName, setRestaurantStreetName] = useState('');
  const [restaurnatPostCode, setRestaurantPostCode] = useState('');
  const [restaurnatPhoneNumber, setRestaurantPhoneNumber] = useState('');

  

  return (
    <GeneralContext.Provider
      value={{
        restaurnatName,
        setRestaurantName,
        restaurnatLogo,
        setRestaurantLogo,
        restaurnatHouseNumber,
        setRestaurantHouseNumber,
        restaurnatStreetName,
        setRestaurantStreetName,
        restaurnatPostCode,
        setRestaurantPostCode,
        restaurnatPhoneNumber,
        setRestaurantPhoneNumber,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
