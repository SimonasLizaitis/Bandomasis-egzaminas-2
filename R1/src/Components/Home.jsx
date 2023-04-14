import { useState, useEffect } from "react";
import "./Home.style.css";
import UserList from "./UserList";
import { dummyUserList } from "./UserData";
import AddUser from "./AddUser";
import calculateTotalFunds from "../functions/calculateTotalFunds";
import FilterUsers from "./FilterUsers";
import userService from "../Services/userService";
// import CookieMonster from "./CookieMonster";
import Login from "./login";
const Home = () => {
    const [userList, setUserList] = useState(dummyUserList);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [shownPage, setShownPage] = useState("list");
    const [refresh, setRefresh] = useState(true);
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await userService.fetchUsers();
            if (!users) {
                alert("No users found");
            }
            updateLists(users);
        };
        fetchUsers();
    }, [refresh]);
    const addUserClickHandler = () => {
        setShownPage("add");
    };
    const showListPage = () => {
        setShownPage("list");
    };
    const deleteUser = async (data) => {
        await userService.destroyUser(data);
        setRefresh((val) => !val);
    };
    const addUser = (data) => {
        updateLists([...userList, data]);
        setRefresh((val) => !val);
    };
    const updateLists = (userList) => {
        setUserList(userList);
        setFilteredUsers(userList);
    };
    return (
        <>
            <article className="article-header">
                <header>
                    <div className="header-center">
                        <h1>FedEx Logistics</h1>
                    </div>
                    <div className="statistics">
                        <div className="client-number">
                            Item counter: {userList.length}
                        </div>
                        <div>
                            Total weight:{" "}
                            {calculateTotalFunds(userList).toFixed(2)} €
                        </div>
                    </div>
                </header>
            </article>
            <section className="section-content">
                {shownPage === "list" && (
                    <>
                        <input
                            type="button"
                            value="Add Box"
                            onClick={addUserClickHandler}
                            className="add-user-btn"
                        />
                        <FilterUsers
                            userList={userList}
                            setFilteredUsers={setFilteredUsers}
                        />
                        <UserList
                            list={filteredUsers}
                            onDelete={deleteUser}
                            setRefresh={setRefresh}
                        />
                        {/* <CookieMonster/> */}
                        <Login/>
                    </>
                )}
                {shownPage === "add" && (
                    <AddUser onBack={showListPage} onAddUser={addUser} />
                )}
            </section>
        </>
    );
};

export default Home;
