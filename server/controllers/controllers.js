const models = require('../models/schema');
const User = models.User;
const Watchlist = models.Watchlist;

const controller = {};

// Controller to save user data to MongoDB
controller.saveUser = async (req, res) => {
  try {
    const { username, email } = req.body;
  
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: 'User already exists' });
    }
  
    // Create a new user document in MongoDB
    const newUser = new User({
      username,
      email,
    });
  
    // Save the user to the database
    await newUser.save();
  
    res.status(201).json({ message: 'User saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to add stock to user's watchlist
controller.addToWatchlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { symbol, name, last, open, high, low, volume, date } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create a new watchlist entry
    const watchlistEntry = new Watchlist({
      symbol,
      name,
      last,
      open,
      high,
      low,
      volume,
      date,
      userId: user._id, // Link the watchlist entry to the user
    });

    // Save the watchlist entry
    await watchlistEntry.save();

    // Add the watchlist entry to the user's watchlist array
    user.watchlist.push(watchlistEntry);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Stock added to watchlist' });
  } catch (error) {
    console.error('Error adding stock to watchlist:', error);
    res.status(500).json({ error: 'An error occurred while adding stock to watchlist' });
  }
};

module.exports = controller;
