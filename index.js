const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware
const doctorRoute = require('./routes/loginroute');
const userRoute = require('./routes/userroute.js');
const logRoute = require('./routes/logroute.js')
const vitalRoute = require('./routes/vitalroute.js');
const predRoute = require('./routes/predroute.js')
const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://pugalramyaa:pugal@menosense.rt7yrlq.mongodb.net/user',).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


app.use('/api',doctorRoute);
app.use('/api',userRoute);
app.use('/api',vitalRoute);
app.use('/api/',logRoute);
app.use('/api',predRoute)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
