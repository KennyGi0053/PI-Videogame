const { Genre } = require('../db')
const axios = require('axios')
require('dotenv').config()
const { API_KEY } = process.env



const allgenres = async () => {

    let genrApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    genrApi = genrApi.data.results;
    genrApi = genrApi?.map((genres) => {
        return {
            name: genres.name,
        }
    });
    genrApi.forEach(async (genres) => {
        await Genre.findOrCreate({
            where: {
                name: genres.name,
            },
});
    });
    let genres = await Genre.findAll();
    return genres;

}

module.exports = allgenres