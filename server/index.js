const express = require('express')
const bp = require('body-parser')
const cors = require("cors");
const axios = require('axios')

const main = require("./controllers/mainctrl")


const port = 3008
const app = express();

app.use(bp.json())
app.use(cors())


app.get("/api/breeds/", main.receivebreeds);
app.get("/api/owners/", main.receiveowners);
app.get("/api/genders/", main.receivegenders);
app.get("/api/status/", main.statuses);
app.post("/api/members/create",main.createOwner)
app.put("/api/members/update", main.updateStatus);
app.delete("/api/breeds/:i", main.deletedbreed);
app.delete("/api/owners/:i", main.deletedowner);
app.delete("/api/genders/:i", main.deletedgender);
app.delete("/api/status/:i", main.deletedstatus);









app.listen(port,()=>console.log(`on ${port}`))

