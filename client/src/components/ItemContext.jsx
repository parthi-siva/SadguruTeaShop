import React, { useState, createContext } from "react";

export const InventoryContext = createContext();

export const ItemProvider = props => {
    const [item, setItem] = useState([
        {
            id: "",
            name: "",
            price: "",
            quantity: "",
            description: "",
            filename: ""

        }
    ]);
    return (
        <InventoryContext.Provider value={[item, setItem]}>
            {props.children}
        </InventoryContext.Provider>
    );
};
