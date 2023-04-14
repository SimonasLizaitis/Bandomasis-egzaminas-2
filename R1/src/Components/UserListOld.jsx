import React, { useState } from "react";
import "./UserList.style.css";
import UserModal from "./UserModal";

const UserList = ({ list, onDelete, setUserList }) => {
    const [showModal, setShowModal] = useState(false);
    const onCloseModal = () => {
        setShowModal(false);
    };
    const [showUserData, setShowUserData] = useState(null);

    const viewUser = (user) => {
        setShowUserData(user);
        setShowModal(true);
    };
    const [fundsAmount, setFundsAmount] = useState("");
    const onAddFunds = (id, fundsAmount) => {
        if (fundsAmount < 0) {
            return alert("Please enter a valid (positive) amount");
        }
        let fundsChange = users.map((user) =>
            user.id === id
                ? { ...user, balance: user.balance + fundsAmount }
                : user
        );
        setFundsAmount(user.balance + fundsAmount);
    };

    return (
        <div>
            <article>
                <h3 className="list-header">Box list</h3>
            </article>
            <table>
                <thead>
                    <tr>
                        <th>Weight</th>
                        <th>Item Name</th>
                        <th>Flammable</th>
                        <th>FastExpiration</th>
                        <th>User Actions</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(({ id, weight, itemName, flammable, fastExpiration }) => {
                        return (
                            <tr key={id}>
                                <td>{`${weight}`}</td>
                                <td>{`${itemName}`}</td>
                                <td>{`${flammable}`}</td>
                                <td>{`${fastExpiration}`}</td>
                                <td>
                                    <div>
                                        <input
                                            type="number"
                                            id="asd"
                                            value={fundsAmount}
                                            onChange={(event) =>
                                                setFundsAmount(
                                                    event.target.value
                                                )
                                            }
                                        ></input>
                                        <input
                                            type="button"
                                            value="Add"
                                            onClick={() =>
                                                onAddFunds(user.id, fundsAmount)
                                            }
                                        ></input>
                                        <input
                                            type="button"
                                            value="Remove"
                                            onClick={() =>
                                                OnRemoveFunds(
                                                    user.id,
                                                    fundsAmount
                                                )
                                            }
                                        ></input>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <input
                                            type="button"
                                            value="View"
                                            onClick={() =>
                                                viewUser({
                                                    weight,
                                                    itemName,
                                                    flammable,
                                                    fastExpiration,
                                                })
                                            }
                                        />
                                        <input type="button" value="Edit" />
                                        <input
                                            type="button"
                                            value="Delete"
                                            onClick={onDelete}
                                        />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {showModal && showUserData !== null && (
                <UserModal onClose={onCloseModal} user={showUserData} />
            )}
        </div>
    );
};

export default UserList;
