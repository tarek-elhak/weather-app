// application endpoint
let projectData = {};
// express and other dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {application} = require("express");
// instantiate an app instance and use the required dependencies
const app = express();
app.use(express.static("website"));
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// set up the local server
const port = 3000;
const server = app.listen(port,()=> console.log(`server running on port: ${port}`));

// get the application data
app.get("/data",(req,res)=>{
    res.send(projectData);
});

// post route for adding entries to the project data
app.post("/store",(req,res)=>{
    projectData.feelings =  req.body.feelings;
    projectData.temp  = req.body.main.temp;
    projectData.date  = req.body.date;
    res.send();
})