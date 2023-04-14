const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const md5 = require('md5');

const app = express();
const port = 3003;

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.use(cookieParser())

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.post("/login", (req, res) => {
    const profiles = JSON.parse(fs.readFileSync("./data/profiles.json", "utf8"));
    const name = req.body.name;
    console.log(req.body.psw);
    const psw= md5(req.body.psw);

    const user= profiles.find(u =>u.name === name && u.psw ===psw);
    if (user) {
        const sessionId = md5(uuidv4()); //Turi buti normali kroptografija!!!
        user.session = sessionId;

        fs.writeFileSync("./data/profiles.json", JSON.stringify(profiles), "utf8");
        res.cookie('fedexClient', sessionId);
        res.json({
            status: 'ok', 
            name: user.name
        });
    } else{
        res.json({
            status: 'error', 
        });
    }

});

app.get("/login", (req, res) => {
    const profiles = JSON.parse(fs.readFileSync("./data/profiles.json", "utf8"));
    const user = req.cookies.fedexClient ? 
        profiles.find(u => u.session === req.cookies.fedexClient) : 
        null;
    if(user) {
        res.json({
            status: 'ok', 
            name: user.name
        });
    } else{
        res.json({
            status: 'error', 
        });
    }
});

app.post("/cookie", (req, res) => {

    if(req.body.delete) {
        res.cookie('cookieMonster', req.body.text, { maxAge: -3600 });
    } else {
        res.cookie('cookieMonster', req.body.text, { maxAge: 3600 });
    }

    res.json({msg: 'OK'});
});

app.get("/users", (req, res) => {
    let allData = fs.readFileSync("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    res.json(allData);
});

app.post("/users", (req, res) => {
    let allData = fs.readFileSync("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    const id = uuidv4();
    const data = {
        id,
        weight: req.body.weight,
        itemName: req.body.itemName,
        flammable: req.body.flammable,
        fastExpiration: req.body.fastExpiration,
    };
    allData.push(data);
    allData = JSON.stringify(allData);
    fs.writeFileSync("./data/users.json", allData, "utf8");
    res.json({
        message: { text: "New user is saved", type: "success" },
    });
});
app.delete("/users/:id", (req, res) => {
    let allData = fs.readFileSync("./data/users.json", "utf8");
    allData = JSON.parse(allData);
    console.log(req.params.id);
    let deletedData = allData.filter((d) => req.params.id !== d.id);
    deletedData = JSON.stringify(deletedData);
    fs.writeFileSync("./data/users.json", deletedData, "utf8");
    res.json({ message: { text: "The user was deleted", type: "danger" } });
});
// app.put("/users/:action/:id", (req, res) => {
//     let allData = fs.readFileSync("./data/users.json", "utf8");
//     allData = JSON.parse(allData);
//     let editedData;
//     if (req.params.action == "add") {
//         editedData = allData.map((d) =>
//             req.params.id === d.id
//                 ? { ...d, number: d.number + req.body.number }
//                 : { ...d }
//         );
//     } else if (req.params.action == "rem") {
//         editedData = allData.map((d) =>
//             req.params.id === d.id
//                 ? { ...d, number: d.number - req.body.number }
//                 : { ...d }
//         );
//     }
//     editedData = JSON.stringify(editedData);
//     fs.writeFileSync("./data/users.json", editedData, "utf8");

//     res.json({ message: { text: "Number was edited", type: "info" } });
// });
app.patch("/users/:id/balance", (req, res) => {
    const userId = decodeURI(req.params.id);
    const amount = parseInt(req.body.balance);
    // read the JSON file
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));

    // find the user with the matching ID
    const user = users.find((u) => u.id === userId);

    // if user is not found, return an error
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    // update the user's balance
    user.balance += amount;

    // write the updated data back to the JSON file
    fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));

    // return the updated user data
    res.json(user);
});

app.listen(3003, () => {
    console.log(`Server running on port ${port}`);
});
