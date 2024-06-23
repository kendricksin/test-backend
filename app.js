const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const navtableRoutes = require('./routes/navtable'); // Ensure the path is correct

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/', navtableRoutes); // Use the correct path

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
