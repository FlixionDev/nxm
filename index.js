const express = require("express");
const app = express();
const {UserRouter}=require("./routes/User.routes")
const {NotesRouter}=require("./routes/Notes.routes")
const cors=require("cors")
const { connection } = require("./configs/db")
const {verify_token}=require("./middleware/authenticate.middleware")
app.use(express.json())
app.use(cors())
app.get("/", (req, res) => {
    res.send("Welcome")
})

app.use("/users",UserRouter)
app.use(verify_token)
app.use("/notes",NotesRouter)
// app.get("/data", async (req, res) => {
//     let token = req.headers.authorization;
//     try {
//         jwt.verify(token, 'masai', (err, decoded) => {
//             if (err) {
//                 console.log(err)
//                 res.send({ "message": "Invalid token" })
//             } else {
//                 res.send({ "message": "data" })
//                 //console.log(decoded)
//             }
//         });

//     } catch (err) {
//         console.log(err)
//         res.send("Something went wrong")

//     }
// })
// app.get("/cart", async (req, res) => {
//     let token = req.headers.authorization;
//     try {
//         jwt.verify(token, 'masai', (err, decoded) => {
//             if (err) {
//                 console.log(err)
//                 res.send({ "message": "Invalid token" })
//             } else {
//                 res.send({ "message": "cart" })
//                 //console.log(decoded)
//             }
//         });

//     } catch (err) {
//         console.log(err)
//         res.send("Something went wrong")

//     }
// })
// app.get("/contact", async (req, res) => {
//     res.send("Contact Page")
// })

app.listen(4000, async () => {
    try {
        await connection
        console.log("Server is connected to DB")
    } catch (err) {
        console.log("Server is not connected to DB")
        console.log(err)
    }

    console.log("Server is running on port number on 4000")
})