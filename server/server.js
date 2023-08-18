const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Set up routes
const apiRoutes = require('./routes/api'); // Import  API routes
app.use('/api', apiRoutes); // Use the API routes under the /api prefix

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
}); 