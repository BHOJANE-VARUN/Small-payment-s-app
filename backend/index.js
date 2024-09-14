const express = require("express");
const app = express();
const port  = 3001;
const cors = require("cors");
app.use(express.json());
app.use(cors());
const mainrouter = require("./routes/index.js");
app.use("/api/v1",mainrouter);
app.listen(port,()=>{
    console.log(`app listening to ${port} port number`);
})
//api/v1/signup