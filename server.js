const express= require ("express");

const server = express(); 

//Creating the route 

server.all("/",(req,res)=>{
  res.send("SpeeDAO is running")
})

function pushBot(){
  server.listen(3000,()=>{
    console.log("speeDAO server is ready")
  })
}

module.exports = pushBot;