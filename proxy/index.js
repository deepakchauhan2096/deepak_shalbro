const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require("request");
const app = express();
const port = 7000; // You can choose any port you prefer

// Middleware
app.use(bodyParser.json());

app.use(cors());

// Dummy data for demonstration
const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// Create a route to fetch data
app.post('/api/items', (req, res) => {
  console.log("HIT");

  let options = {
    method: "POST",
    url: `http://54.243.89.186:5001`,
    json: true,
  };
  function callback(error, response, body) {
    const status = response.statusCode;
    // console.log(error, body);
    if (error === null) {
      res.status(status).send(body);
    } else {
      res.status(status).send(error);
    }
  }
  request(options, callback);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
