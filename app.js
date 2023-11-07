const express = require("express");
const app = express();

const router = require("./routes/route");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src"));
app.use(express.json());

app.use("/", router);

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.log("Error starting the server");
  }
  console.log("Server running on port", PORT);
});
