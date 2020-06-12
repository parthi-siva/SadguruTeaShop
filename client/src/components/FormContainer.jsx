import React, { useState, useContext } from "react";
import InputArea from "./forms/Input";
import TextArea from "./forms/TextArea";
import Button from "./forms/Button";
import { InventoryContext } from "./ItemContext";
import regeneratorRuntime from "regenerator-runtime";

export const FormContainer = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDesc] = useState("");
    const [quantity, setQty] = useState("");
    const [fileobj, setFileObj] = useState("");
    const [item, setItem] = useContext(InventoryContext);

    const updateName = e => {
        setName(e.target.value);
    };

    const updatePrice = e => {
        setPrice(e.target.value);
    };

    const updateDesc = e => {
        setDesc(e.target.value);
    };

    const updateQuantity = e => {
        setQty(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const fileObj = new FormData()
        fileObj.append('file', fileobj)
        fileObj.append('filename', fileobj.name)
        fileObj.append('type', fileobj.type)
        fileObj.append('name', name)
        fileObj.append('price', price)
        fileObj.append('description', description)
        fileObj.append('quantity', quantity)
        await axios
            .post(process.env.REACT_APP_ADDITEM, fileObj, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': process.env.REACT_APP_AUTHORIZATION
                }
            })
            .then(response => {
                if (response.statusText == "OK") {
                    setItem(prevState => [
                        ...prevState,
                        { name, price, description, quantity }
                    ]);
                }
            })
            .then(error => {
                console.log(error);
            });
    };
    const onChangeHandler = e => {
        setFileObj(e.target.files[0]);
    }
    const buttonStyle = {
        margin: "10px 10px 10px 10px"
    };

    return (
        <form className='col-md-5 col-sm-12' onSubmit={handleFormSubmit}>
            <InputArea
                inputType={"text"}
                title={"Item Name"}
                name={"name"}
                value={name}
                handleChange={updateName}
                placeholder={"Enter Item"}
            />{" "}
            <InputArea
                inputType={"number"}
                title={"Price"}
                name={"price"}
                value={price}
                handleChange={updatePrice}
                placeholder={"Enter Price"}
            />{" "}
            <InputArea
                inputType={"number"}
                title={"Quantity"}
                name={"quantity"}
                value={quantity}
                handleChange={updateQuantity}
                placeholder={"Enter Quantity"}
            />{" "}
            <TextArea
                title={"About you the item"}
                rows={10}
                name={"Product Info"}
                value={description}
                handleChange={updateDesc}
                placeholder={"Describe item"}
            />
            <div className="form-group">
                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01" onChange={onChangeHandler} />
                </div>
            </div>
            <Button type={"primary"} title={"Submit"} style={buttonStyle} />{" "}
        </form>
    );
};
