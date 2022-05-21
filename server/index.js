import express from "express";
// const express = require("express") // if you're using NodeJS, you need to use this line. However, for this project, I will use ES6 modules so I can use import and export commands. Therefore I need to add this line:  "type": "module", to the package.json
import dotenv from "dotenv";
// this line imports the .env file created to contain and hide the mongoDB data like username, password and DB name. Remember, to first run: "yarn add dotenv" before importing the file.
import mongoose from "mongoose";

// Importing all routes for the app
import authRoute from "./routes/auth.js"; //if you're using import for files in express server, always add ".js" to the end of your imported files. For libraries, you don't need it.
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();

dotenv.config();
// we need to configure the .env file before we can use it and that's what this line does. Now we can use our data and connect to mongoDB

// API to mongoDB database
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO); //process.env.MONGO is the url that connects to the mongoDB from the .env file
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};
// note that the function connect only tries to connect with mongoDB at the initialisation of the app, if it fails to connect to the database, it won't try to reconnect

// However, the lines of code below: mongoose.connection.on will log the respective messages to the console once the first connection to the database is established and if anything happens to the database server, for example, a network problem on mongoDB, it will log to the console - "mongoDB disconnected" and the server will try to reconnect unlike the first connection established by the function  - "connect" defined above
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

// Creating Middlewares

app.use(express.json()); //this allows us to send json data to express server endpoint

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Handling Request Errors
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
}); //Note that the error handling function always uses the format above - 4 parameters in the order above - err,req,res,next, otherwise it wouldn't work

// To start the express server
app.listen(8000, () => {
  connect();
  console.log("Connected to backend on Port: 8000!");
});
// note that in the package.json, I will add: "start": "nodemon index.js" to the scripts so I can start the server anytime and without restarting with: yarn start
