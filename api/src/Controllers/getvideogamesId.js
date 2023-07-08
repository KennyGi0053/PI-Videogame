const axios = require('axios')
const {API_KEY} = process.env
require('dotenv').config()
const { Videogame, Genre } = require('../db')



const allvideogamesId = async(id) => {

    
    if (id.length<5) {
      const URL = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
  
      const response = await axios.get(URL);
      const data = response.data;
      
  
     
      const idDataGames = {
        id: data.id,
        name: data.name,
        description: data.description,
        platforms: (data.platforms.map((p) => p.platform.name)).join(" | "),
        image: data.background_image,
        releaseDate: data.released,
        rating: data.rating,
        genres: (data.genres.map((g) => g.name)).join(' | '),
      };
     
      return idDataGames;
    } else {
      let searchById = await Videogame.findByPk(id, {
        include: {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      const gamedb = {
        id: searchById.dataValues.id,
        name: searchById.dataValues.name,
        genres: searchById.dataValues.genres?.map((gen) => gen.name).join(' | '),
        platforms: searchById.dataValues.platforms,
        releaseDate: searchById.dataValues.releaseDate,
        image: searchById.dataValues.image,
        rating: searchById.dataValues.rating,
        description: searchById.dataValues.description,
      }
      return gamedb;
      
    }






    // const apivideogamesId = [(await axios (`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data]
    // //console.log(apivideogamesId)
    // const apiId = (id) ?

    // apivideogamesId.map (element => {

    //     return {
    //         id: element.id,
    //         name: element.name,
    //         image: element.background_image,
    //         genres: element.genres.map(g => g.name),
    //         description: element.description,
    //         releaseDate: element.released,
    //         rating: element.rating,
    //         platforms: element.platforms?.map(p => p.platform.name)
    //     }
    // })

    // : (await Videogame.findBypk(id,{
    //     include: {
    //         model:Genre,
    //         attributes: ['name']
    //     }
    // })).map(element => {

    //     return {
    //         name: element.name,
    //         image: element.image,
    //         genres: element.genres,
    //         description: element.description,
    //         releaseDate: element.released,
    //         rating: element.rating,
    //         platforms: element.platforms
    //     }
    // })

    // apivideogamesId.filter((api) => {
    //     api.id === Number(id)
    // })
    // return apiId


}
module.exports = allvideogamesId