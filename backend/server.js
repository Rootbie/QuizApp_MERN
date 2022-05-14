const express = require("express")
const mongodb = require("mongodb")
const cors = require("cors")

const app = express()

app.use(express.urlencoded( {extended : true} ))
app.use(express.json())
app.use(cors())

let db = null

async function startServer(){
    const client = mongodb.MongoClient.connect('mongodb://localhost:27017/wpr-quiz');
    db = (await client).db()
    console.log("Connected to My database !")

    function setDatabase(req, res, next){
        req.db = db;
        next()
    }

    app.use(setDatabase)

    const apiRoute = require("./module/api")
    app.use(apiRoute)

    // express listen
    await app.listen(3001);
    console.log("Listening on port 3001!")

}

startServer()