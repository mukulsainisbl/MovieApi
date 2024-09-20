const express = require("express");
const movieModel = require("../models/movie.model");
const movieRouter = express.Router();

// GET Route to fetch movies (with optional title filtering)
movieRouter.get("/", async (req, res) => {
  let queryObj = {};
  if (req.query.title) {
    queryObj.title = { $regex: req.query.title, $options: "i" }; // case-insensitive search
  }
  if (req.query.rating) {
    queryObj.rating = req.query.rating;
  }

  let sortObj = {};
  if (req.query.sort) {
    sortObj[req.query.sort] = req.query.order == "asc" ? 1 : -1;
  }

  let page;
  let limit;
  if (req.query.page) {
    page = req.query.page;
  }

  if (req.query.limit) {
    limit = req.query.limit;
  }

  try {
    let getMovies = await movieModel
      .find(queryObj)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({ msg: "All Movies", getMovies });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// POST Route to add a new movie
movieRouter.post("/", async (req, res) => {
  const newData = req.body;
  console.log(newData);

  try {
    const newMovie = new movieModel(newData);
    if (!newMovie) {
      res.status(400).send("Error in movie creation");
      return;
    }
    await newMovie.save();
    res.status(201).json({ msg: "Movie Created Successfully", newMovie });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

movieRouter.put("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let updatedData = await movieModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedData) {
      res.status(404).json({ Msg: "Movie not found" });
    }

    res.status(200).json({ Msg: "Movie update success", updatedData });
  } catch (error) {
    res.status(500).json({ Msg: error.message });
  }
});

movieRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let deleledData = await movieModel.findByIdAndDelete(id);
    if (!deleledData) {
      res.send("Movie data not found");
    }

    res.status(200).json({ Mag: "Movies delete successfully"});
  } catch (error) {
    res.status(500).json({ Msg: error.message });
  }
});

module.exports = movieRouter;
