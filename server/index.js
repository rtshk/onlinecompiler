//Importing necessary modules 
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const geminiRoutes = require("./routes/geminiRoutes");
const compilerRoutes = require("./routes/compileRoutes")

//Setting up express app
const app = express();
const PORT = process.env.PORT;

//Middlewares setup
app.use(cors({
    origin : 'https://onlinecompiler-4c3j.onrender.com',
    credentials : true,
}))
app.use(express.json());

// app.use("/authentication", userRoutes);
//app.use("/folder", fileRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/compile", compilerRoutes);


app.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`)
})
