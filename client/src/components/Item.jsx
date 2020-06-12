import React, { useEffect, useState } from "react";
const Path = require("path");
import regeneratorRuntime from "regenerator-runtime";

const Item = ({ match }) => {
    const [item, setItem] = useState([]);
    useEffect(async () => {
        const name = match.params.id;
        await axios
            .post(process.env.REACT_APP_GETITEM, {
                name
            }, {
                    headers: {
                        'Authorization': process.env.REACT_APP_AUTHORIZATION
                    }
                })
            .then(response => {
                setItem(response.data)
                console.log(item)
            })
            .then(error => {
                console.log(error);
            });

    }, [])

    const imgStyle = {
        width: "400px", height: "400px"
    }


    return (
        <div className="container" >
            <h3 className="center">{item.name}</h3>
            <div className="box">
                <div className="card">
                    <div className="card-image">
                        <img src={item.filename} alt={item.filename} style={imgStyle} />
                    </div>
                    <div className="card-content">
                        <p><b>{item.description}</b></p>
                        <p><b>Price: {item.price} Rs</b></p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Item;
