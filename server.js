const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const menuController = require("./controller/menucontroller");
const isAuthenticated = require("./middleware/authmiddleware");
const userController = require("./controller/usercontroller");

const app = express();
app.use(express.json());
app.use(cors());
const port = 4222;

// Replace <password> with your actual password
const uri = "mongodb+srv://khrisna123:khrisna123@cluster0.widiwtd.mongodb.net/?retryWrites=true&w=majority";

// Create a new menu
app.post("/data", menuController.createMenu);

// Get a menu by ID
app.get("/data/:id", menuController.getMenuById);

// Get all menus
app.get("/data", isAuthenticated, menuController.getAllMenus);

// Update a menu by ID
app.put("/data/:id", menuController.updateMenu);

// Delete a menu by ID
app.delete("/data/:id", menuController.deleteMenu);

// Register a new user
app.post("/register", userController.registerUser);

// Login
app.post("/login", userController.login);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
