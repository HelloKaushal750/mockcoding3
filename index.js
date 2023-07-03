const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { UserController } = require("./routes/User.route");
const { EmployeeController } = require("./routes/Employee.route");
const { authenticate } = require("./middleware/authenticate");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/", UserController);

app.use(authenticate);

app.use("/employees", EmployeeController);


// Port
const port = process.env.PORT;

connection
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log("Connected to Database");
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Database");
  });
