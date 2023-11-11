const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {Travel} = require("./traver.model")
const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config()
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MongoURL
mongoose.connect(mongoURI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.post('/api/travel', async (req, res) => {
    try {
      const newTravel = new Travel(req.body);
      await newTravel.save();
      res.status(201).json(newTravel);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  app.get('/api/travels', async (req, res) => {
    try {
      const travels = await Travel.find();
      res.json(travels);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // API to delete data by ID
  app.delete('/api/travel/:id', async (req, res) => {
    try {
      const deletedTravel = await Travel.findByIdAndDelete(req.params.id);
      if (!deletedTravel) {
        return res.status(404).json({ error: 'Travel data not found' });
      }
      res.json(deletedTravel);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
 
 
app.get('/api/travels/filterAndSort', async (req, res) => {
    try {
      const { destination, order } = req.query;
      let query = {};
  
    
      if (destination) {
        query.destination = destination;
      }
  
      const travels = await Travel.find(query).sort({ budgetPerPerson: order === 'asc' ? 1 : -1 });
      res.json(travels);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
