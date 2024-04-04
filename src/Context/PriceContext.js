import React, { createContext, useContext, useState } from 'react';

const PriceContext = createContext();

export const usePrice = () => useContext(PriceContext);

export const PriceProvider = ({ children }) => {
    const [priceData, setPriceData] = useState(null);

    const updatePriceData = (data) => {
        setPriceData(data);
    };

    return (
        <PriceContext.Provider value={{ priceData, updatePriceData }}>
            {children}
        </PriceContext.Provider>
    );
};
