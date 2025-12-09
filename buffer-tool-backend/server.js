require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const runPostScheduler = require("./jobs/postScheduler");
runPostScheduler();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/social", require("./routes/socialRoutes"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port " + process.env.PORT)
    );
  })
  .catch((err) => console.error("DB Connection Failed", err));

require("./jobs/postScheduler")();