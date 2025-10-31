const express=require("express");
const app=express();
const port=5498;

app.listen(port,()=>{
    console.log(`server working on ${port}`);
})