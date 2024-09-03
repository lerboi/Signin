const express = require("express")
const path = require("path")
const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "027614",
    database: "test"
})
const port = 3000
const app = express();

app.use(express.json())
app.use(express.static(__dirname))

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"))
})

app.post("/signup", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const q = `INSERT INTO users_practice1 (username, password) VALUES (?, ?)`
    const values = [username, password]

    db.query(q, values, (err, data) => {
        if (err){
            console.log(err)
            res.status(400)
        }
        else{
            console.log(data)
            res.status(200).json({redirect: "/"})
        }
    })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/", (req, res) => {
    const username = req.body.username
    const pass = req.body.password
    
    const q = `SELECT * FROM users_practice1`

    db.query(q, (err, data) => {
        if(err) return(console.log(err));
        else{
            let userFound = false

            data.forEach(data => {
                if(data.username == username && data.password == pass){
                    userFound = true
                    console.log("logged in")
                    return res.status(200).json({message: "Welcome", redirect: "welcome.html"})
                } 
            })

            if(!userFound){
                return res.status(400).json("wrong")
            }
        }
    })

    res.status(200)
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "welcome.html"))
})

app.listen(port, () => {
    console.log("Listening to port "+ port)
})
