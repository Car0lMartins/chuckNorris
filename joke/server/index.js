const axios = require("axios");
const express = require("express");
const bodyParser= require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors())
const cache = [];

app.get("/joke", async (req, res) => {

    if (cache.length === 0 || cache.length <= 1) {
        for(let i = 0; i < 10-cache.length; i++){
            cache.push(await getJoke());
        }
    }
    res.send(cache.pop());

});

const getJoke = async () => {
    const response = await axios.get("https://api.chucknorris.io/jokes/random")
    return response.data.value;
}

app.listen(3001, () => {
    console.log(`Server is listen on port 3001...`);
  });