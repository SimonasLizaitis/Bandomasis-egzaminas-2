import React from "react";
import { useState } from "react";
import "./UserForm.style.css";
import userService from "../Services/userService";

const AddUser = ({ onBack, onAddUser }) => {
    const [weight, setWeight] = useState("");
    const [itemName, setItemName] = useState("");
    const [flammable, setFlammable] = useState("");
    const [fastExpiration, setFastExpiration] = useState("");

    const onWeightChangeHandler = (e) => {
        setWeight(e.target.value);
    };
    const onItemNameChangeHandler = (e) => {
        setItemName(e.target.value);
    };
    const onFlammableChangeHandler = (e) => {
        setFlammable(e.target.value);
    };
    const onFastExpirationChangeHandler = (e) => {
        setFastExpiration(e.target.value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            weight,
            itemName,
            flammable,
            fastExpiration,
        };
        let response = await userService.addNewUser(data);
        if (response.ok) {
            // Display a success message to the user
            alert("User added successfully");
        } else {
            // Handle errors
            alert("Error adding user");
        }
        onAddUser(data);
        onBack();
    };
    return (
        <div className="form-container">
            <div>
                <h3>Add Box</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Weight:</label>
                    <input
                        type="text"
                        value={weight}
                        onChange={onWeightChangeHandler}
                    ></input>
                </div>
                <div>
                    <label>Item Name:</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={onItemNameChangeHandler}
                    ></input>
                </div>
                <div>
                    <label>Flammable, yes or no:</label>
                    <input
                        type="text"
                        value={flammable}
                        onChange={onFlammableChangeHandler}
                    ></input>
                </div>
                <div>
                    <label>Fast Expiration, yes or no:</label>
                    <input
                        type="text"
                        value={fastExpiration}
                        onChange={onFastExpirationChangeHandler}
                    ></input>
                </div>
                <div>
                    <input type="button" value="Back" onClick={onBack}></input>
                    <input
                        disabled={weight.length < 2 || itemName.length < 2 || flammable.length < 2 || fastExpiration.length < 2}
                        type="submit"
                        value="Add Box"
                    ></input>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
