const express = require("express");
const cors = require("cors");
const mongoDb = require("./mongoDb");
const serviceRouter = require("./routes/services");
const galleryRouter = require("./routes/gallery");
const doctorsRouter = require("./routes/doctors");
const appointmentRouter = require("./routes/appointment");

// app;
const app = express();
const port = process.env.PORT || 5000;

//midleware
app.use(cors());
app.use(express.json());

//connection
const client = mongoDb();

async function run() {
    await client.connect();
    const database = client.db('IslamiaHospital');
    //service
    app.use("/services", serviceRouter);

    // appintments 
    app.use("/appointment", appointmentRouter)

    //doctors
    app.use("/doctors", doctorsRouter);

    //gallery
    app.use("/gallery", galleryRouter);
};

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send(`islamia hospital server`)
})

app.listen(port, () => {
    console.log("It's running...", port)
})