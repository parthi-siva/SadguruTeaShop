import React, { useContext, useEffect } from "react";
import { InventoryContext } from "./ItemContext";
import regeneratorRuntime from "regenerator-runtime";

const Nav = () => {
    const [item, setItems] = useContext(InventoryContext);
    return (
        <nav class="navbar">
            <a class="navbar-brand" href="/">Sadguru's Amrit-Tulya - Tea Shop</a>
            <div class="navbar-right">
                <div class="container minicart">{item.length}
                    <i class="fa fa-shopping-cart"></i>
                </div>
            </div>
        </nav>
    );
};
export default Nav;