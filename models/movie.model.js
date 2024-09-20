const mongoose = require("mongoose");
const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
     
      trim: true,
    },
    director: {
      type: String,
    
      trim: true,
    },
    releaseYear: {
      type: Number,
     
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
  },
  { timestamps: true, versionKey: false }
);

const movieModel = mongoose.model('movie', movieSchema)

module.exports = movieModel