const mongoose = require("mongoose");
const express = require("express");
const connect = require("./utils/db");
const Movie = require("./models/movies");
const { restart } = require("nodemon");
const rutasMovies = require("./routes/movie.routes")
const rutasCinema = require("./routes/cinema.routes")
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
connect();
server.use("/movies", rutasMovies)
server.use("/cinema", rutasCinema)




server.listen(4001, () => console.log("Servidor iniciado"));
