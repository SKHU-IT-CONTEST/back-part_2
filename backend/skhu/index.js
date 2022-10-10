const schoolNotice = require("./crawl-lib/schoolNotice.js");
const express = require("express");
const Weather = require("./crawl-lib/Weather.js");
const app = express();
const noticeObj = new schoolNotice();
const weatherObj = new Weather();
const cors = require("cors");

let corsOptions = {
    origin : '*',
    Credential : true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));



app.get("/schoolNotice", (req, res) => {
    noticeObj.getData().then((data) => res.json(data));
})
app.get("/getWeather", (req, res) => {
    weatherObj.getData().then((data) => res.json(data));
})

app.listen(32023, () => console.log("Listening on port 32023..."));
