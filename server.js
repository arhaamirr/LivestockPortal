const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://aimenmukhtar196:hLWuOsXpVoxhHuMa@livestock.05mryhf.mongodb.net/?retryWrites=true&w=majority&appName=Livestock",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
