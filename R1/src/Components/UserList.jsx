import React, { useState } from "react";
import "./UserList.style.css";
import UserModal from "./UserModal";
import userService from "../Services/userService";

const UserList = ({ list, onDelete, setRefresh }) => {
    const [balanceUpdates, setBalanceUpdates] = useState("");

    const handleInputChange = (userId, amount) => {
        setBalanceUpdates({ ...balanceUpdates, [userId]: amount });
    };
    const handleAddBalance = async (id, balance) => {
        if (parseInt(balance) <= 0) {
            alert("Amount must be greater than 0");
            setBalanceUpdates({ ...balanceUpdates, [id]: "" });
            return;
        }
        let response = await userService.addBalance(id, balance);
        if (response.ok) {
            // Refresh the user list
        } else {
            // Handle errors
            alert("Error updating balance");
        }
        setRefresh((val) => !val);
        setBalanceUpdates({ ...balanceUpdates, [id]: "" });
    };

    const [showModal, setShowModal] = useState(false);
    const onCloseModal = () => {
        setShowModal(false);
    };
    const [showUserData, setShowUserData] = useState(null);

    const viewUser = (user) => {
        setShowUserData(user);
        setShowModal(true);
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
                        <th>Fast Expiration</th>
                        <th>User Actions</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {list
                        .sort((a, b) => a.itemName.localeCompare(b.itemName))
                        .map((user) => (
                            <tr key={user.id}>
                                <td>{user.weight}</td>
                                <td>{user.itemName}</td>
                                <td>{user.flammable}</td>
                                <td>{user.fastExpiration}</td>
                                <td>
                                    <div>
                                        <input
                                            className="actions-btn"
                                            type="button"
                                            value="View"
                                            onClick={() => viewUser(user)}
                                        />

                                        <input
                                            className="actions-btn"
                                            disabled={user.balance > 0}
                                            type="button"
                                            value="Delete"
                                            onClick={() => onDelete(user.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {showModal && showUserData !== null && (
                <UserModal onClose={onCloseModal} user={showUserData} />
            )}
        </div>
    );
};

export default UserList;
