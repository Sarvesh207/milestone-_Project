const express = require("express");
const mongoose = require("mongoose")
const app = express();
const dbURL = process.env.DB_URL;

// connect db
function ConnectToMongoDB() {
    try {
        mongoose.connect(dbURL)
        console.log('Connect to DB')
    } catch (error) {
        console.log('Can not connect to DB')
    }
}

app.use(express.json());



app.get('/', (req, res) => {
    console.log("/ called")
    res.send("Server is running")
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => {
    console.log(`Server ⚙️  is running on PORT: ${PORT}`)
})