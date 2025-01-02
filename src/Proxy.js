const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/recipe-jokes", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/food/jokes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=1`
    );
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error fetching joke:", err.message);
    res.json(500).send(err.message);
  }
});

app.listen(5000, () => {
  console.log("Proxy server running on http://localhost:5000");
});
