const client = require('../db/conn');

const getAllMoviesByUserId = async (request, response) => {
    const { userid } = request.tokenIsValid
    try {
        const getMovie = await client.query(`select movie_name, rating, casting, genre, release_date, movie_id, user_id from movie where user_id = ${Number(userid)}`)
        response.status(200).json({ status: true, message: getMovie.rows });
    } catch (error) {
        response.status(500).json(error);
    }
}

const addMovie = async (request, response) => {
    const { userid } = request.tokenIsValid
    const { movie_name, rating, casting, genre, release_date = "now()" } = request.body;
    try {
        const insertNewMovie = await client.query("insert into movie (movie_name, rating, casting, genre, user_id, release_date) values ($1, $2, $3, $4, $5, $6) returning *", [movie_name, Number(rating), casting, genre, userid, release_date])
        response.status(200).json({ status: true, message: "new movie added", data: insertNewMovie });
    } catch (error) {
        response.status(500).json({ error });
    }
}

const updateMovie = async (request, response) => {
    const { userid } = request.tokenIsValid
    const { rating, movie_name, genre, casting, release_date } = request.body
    const { movieid } = request.query
    const movieId = Number(movieid)
    const numRating = Number(rating)
    try {
        const updatedMovie = await client.query(`UPDATE movie
        SET movie_name = '${movie_name}',
        rating = ${numRating},
        casting = '${casting}',
        genre = '${genre}'
        WHERE movie_id = ${movieId} and user_id = ${userid}
        returning *`)
        response.status(200).json({ status: true, message: updatedMovie.rows });
    } catch (error) {
        response.status(500).json({ error });
    }
}

const deleteMovie = async (request, response) => {
    const { userid } = request.tokenIsValid
    const { movieid } = request.query
    try {
        const deleteMovie = (await client.query(`delete from movie where movie_id = ${Number(movieid)} and user_id = ${Number(userid)} returning *`)).rows
        response.status(200).json({ status: true, message: deleteMovie });
    } catch (error) {
        response.status(500).json(error);
    }
}

module.exports = { getAllMoviesByUserId, addMovie, updateMovie, deleteMovie };



// release_date = ${new Date(release_date).toLocaleString()}::timestamp