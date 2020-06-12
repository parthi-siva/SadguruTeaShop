import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { InventoryContext } from "./ItemContext";
import regeneratorRuntime from "regenerator-runtime";

const Items = props => {
    const [item, setItems] = useContext(InventoryContext);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_GETALLITEM, {
                headers: {
                    'Authorization': process.env.REACT_APP_AUTHORIZATION
                }
            })
            .then(response => {
                setItems(response.data)
            });

    }, [item.length])

    const imgStyle = {
        width: "20px", height: "20px"
    }
    return (
        <div className='col-md-7 col-sm-12 text-left'>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"> </th>
                        <th scope="col">Product</th>
                        <th scope="col" class="text-center">Quantity</th>
                        <th scope="col" class="text-right">Price</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {item.slice(0, item.length).map(itm => (
                        <tr>
                            <td><img src={itm.filename} alt={itm.filename} style={imgStyle} /> </td>
                            <Link to={`/item/${itm.name}`}>
                                <td class="text-center">{itm.name}</td>
                            </Link>
                            <td class="text-center">{itm.quantity}</td>
                            <td class="text-center">{itm.price}</td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-danger" onClick={async () => {
                                    const name = itm.name;
                                    await axios
                                        .post(
                                            process.env.REACT_APP_DELETEITEM,
                                            {
                                                name
                                            },
                                            {
                                                headers: {
                                                    'Authorization': process.env.REACT_APP_AUTHORIZATION
                                                }
                                            }
                                        )
                                        .then(response => {
                                            if (response.status == 200) {
                                                setItems(
                                                    item.filter(
                                                        i => i.name !== itm.name
                                                    )
                                                );
                                            }
                                        })
                                        .then(error => {
                                            console.log(error);
                                        });
                                }}>
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Items;
