const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./connection/dbConnection");
connectDB();

const app = express();

//Middleware , แก้ No Access-Control Allow Origin,
const cors = require("cors");
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/recipe", require("./routes/recipeRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
