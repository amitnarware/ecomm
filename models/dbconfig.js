let mysql = require('mysql')
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bazzar" // owastrule security   // android studio must read this topic
});
connection.connect(function(err){
    if(err){
        console.log("Not Connected",err.sqlMessage)}
   else{
    console.log("connected")
   }
})  

module.exports = {connection}; 

/*const express = require("express");
const app = express();


app.get("/", function(req,res){
    res.send("hello i am amit")
})

app.listen(3000,() => {
    console.log("server is running on 3000")
}) */