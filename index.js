const express = require("express");
const { MongoClient } = require('mongodb');
const { ObjectId } = require("mongodb");
const cors = require("cors");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());

//connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wewoq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    //service
    try {
        await client.connect();
        const database = client.db('IslamiaHospital');
        const services = database.collection("service");
        //post
        app.post("/services", async (req, res) => {
            const service = req.body;
            const result = await services.insertOne(service);
            res.json(result);
        });
        //get
        app.get("/services", async (req, res) => {
            const cursor = services.find({});
            const result = await cursor.toArray();
            res.send(result);
        });
        //get one
        app.get("/services/:id", async (req, res) => {
            const id = req.params.id;
            const quary = { _id: ObjectId(id) };
            const result = await services.findOne(quary);
            res.send(result);
        });
        //delete
        app.delete("/service/:id", async (req, res) => {
            const id = req.params.id;
            const quary = { _id: ObjectId(id) };
            const result = await services.deleteOne(quary);
            res.json(result)
        })
    }
    finally {
        // await client.close();
    }

    //doctors
    try {
        await client.connect();
        const database = client.db('IslamiaHospital');
        const doctors = database.collection("doctors");

        //post
        app.post("/doctors", async (req, res) => {
            const doctor = req.body;
            console.log(doctor);
            const result = await doctors.insertOne(doctor);
            res.json(result);
        });
        //get
        app.get("/doctors", async (req, res) => {
            const cursor = doctors.find({});
            const result = await cursor.toArray();
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }

    //gallery
    try {
        await client.connect();
        const database = client.db('IslamiaHospital');
        const gallery = database.collection("gallery");
        //post
        app.post("/gallery", async (req, res) => {
            const img = req.body;
            const result = await gallery.insertOne(img);
            res.json(result);
        });
        //get
        app.get("/gallery", async (req, res) => {
            const cursor = gallery.find({});
            const result = await cursor.toArray();
            res.send(result)
        })
    }
    finally {
        // await client.close();
    }
};
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("islamia hospital server")
})

app.listen(port, () => {
    console.log("It's running...", port)
})