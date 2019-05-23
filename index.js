const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

//set static folder
const buildPath = path.join(__dirname, 'client', 'build');
app.use(express.static(buildPath));
//for any route that isn't hit with routes/api use this route
app.get('/', (req, res) => {
   res.sendFile(path.join(buildPath, 'index.html'));
});

async function getData(x) {
   try {
      const response = await axios.get(
         `https://api.um.warszawa.pl/api/action/busestrams_get/?${x}`
      );
      //console.log(response.data);
      return response.data;
   } catch (error) {
      return error;
   }
}

app.get('/link/:x', (req, res) => {
   const { x } = req.params;
   getData(x).then(result => res.send(result));
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
   console.log(`Port is listening on ${port}`);
});

module.exports = server;
