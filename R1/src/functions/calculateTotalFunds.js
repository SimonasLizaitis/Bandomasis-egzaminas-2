const calculateTotalFunds = (list) => {
    if (!list) return 0
    return list.reduce((acc, userList) => acc + Number(userList.weight), 0);
    // let sum = 0;
    // for (let i = 0; i < list.length; i++) {
    //     sum += list[i].balance;
    //     console.log(list[i]);
    // }
    // return sum;
};
export default calculateTotalFunds;
