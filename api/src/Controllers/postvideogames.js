const { Videogame, Genre } = require('../db')


const postData = async(name, image, description, releaseDate, rating, platforms, genres) => {

    const videogames = await Videogame.create ({
        name,
        image,
        description,
        releaseDate,
        rating,
        platforms,

    })

    const idGenres = await Genre.findAll({
        where: { name: genres }
    })
    await videogames.addGenre(idGenres)

    const gameRelation = await Videogame.findOne({
        where: {
          id: videogames.id,
        },
        include: [{
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }]
      })
   
      
      return gameRelation;
}


module.exports = postData