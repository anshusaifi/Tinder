console.log("hii");
const express = require('express')

const app = express();

app.get("/user/:ID/:NAME/:PASSWORD",(req,res)=>{
    console.log(req.params);
})

app.post("/user",(req,res)=>{
    res.send({
        name : "I AM A POST CALL"
    })
})

app.use("/start",(req,res)=>{
    res.send("hello from server")

})


app.listen(3000,()=>{
    console.log("server is listening on port 3000");
})