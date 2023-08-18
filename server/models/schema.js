const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    // Fields for Google OAuth
    googleId: {
      type: String,
    },
    googleAccessToken: {
      type: String,
    },
    googleRefreshToken: {
      type: String,
    },
    watchlist: [{
      type: Schema.Types.ObjectId,
      ref: 'watchlist'
    }],
  },
  {
    timestamps: true,
  }
);
  
const watchlistSchema = new Schema({
  symbol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  last: {
    type: Number,
    required: true,
  },
  open: {
    type: Number,
    required: true,
  },
  high: {
    type: Number,
    required: true,
  },  
  low: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

const User = mongoose.model('user', userSchema);
const Watchlist = mongoose.model('watchlist', watchlistSchema);

module.exports = {
  User,
  Watchlist,
};