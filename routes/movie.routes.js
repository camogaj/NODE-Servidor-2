const express = require("express");
const Movie = require("../models/movies");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const peliculas = await Movie.find();
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/id/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pelicula = await Movie.findById(id);
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/titulo/:titulo", async (req, res) => {
  try {
    const title = req.params.titulo;
    const pelicula = await Movie.find({
      title,
    });
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/genero/:genero", async (req, res) => {
  try {
    const genero = req.params.genero;
    const pelicula = await Movie.find({
      genre: genero,
    });
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/anio", async (req, res) => {
  try {
    const peliculas = await Movie.find({ year: { $gte: 2010 } });
    res.status(200).send(peliculas);
  } catch (error) {
    console.log(error);
  }
});

router.post("/crear", async (req, res, next) => {
  try {
    const nuevaPelicula = new Movie({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
    });
    const peliculaGuardada = await nuevaPelicula.save();
    res.status(200).send(peliculaGuardada);
  } catch (error) {
    next(error);
  }
});

router.put("/editar/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const peliculaEditada = new Movie(req.body);
    peliculaEditada._id = id
    const resultado = await Movie.findByIdAndUpdate(id, peliculaEditada);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
});

router.delete("/borrar/:id", async (req, res, next) =>{
    try {
        const id = req.params.id;
        const peliculaEliminada = await Movie.findByIdAndRemove(id)
        res.status(200).json(peliculaEliminada);
    } catch (error) {
        next(error)
    }
})


module.exports = router;
