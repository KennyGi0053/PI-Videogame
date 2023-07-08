const { Videogame, Genre } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env
require('dotenv').config()



const getvideogames = async() => {




let apiurls = [];
for(let i = 1; i <= 5; i++) {
    apiurls = [...apiurls, `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`]
};
let api = apiurls.map((url)=> axios.get(url));
api = await Promise.all(api);
api = api?.map((response) => response.data.results).flat();
api = api?.map((game) => {
    return {
        id: game.id,
        name: game.name,
        genres: game.genres?.map((gen) => gen.name).join(" | "),
        platforms: game.platforms?.map((plat)=> plat.platform.name),
        releaseDate: game.released,
        image: game.background_image,
        rating: game.rating,
    };
});
let gamesdb = await Videogame.findAll({
    include: {
        model: Genre,
        attributes:  ["name"],
        through: {
            attributes: [],
        },
    },
});
gamesdb = gamesdb?.map((game)=> {
    return {
        id: game.id,
        name: game.name,
        genres: game.genres?.map((gen) => gen.name).join(" | "),
        platforms: game.platforms,
        releaseDate: game.released,
        image: game.background_image,
        rating: game.rating,
        description: game.description,
    };
});

return [...api, ...gamesdb];
}

module.exports = getvideogames