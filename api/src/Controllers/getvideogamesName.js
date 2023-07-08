const { Videogame, Genre } = require('../db')
require('dotenv').config()
const { API_KEY } = process.env
const axios = require('axios')


const allvideogamesName = async(name) => {


    const api = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`)

    
   
    const apivideogames = api.data.results.map(element => {

        return {
            id: element.id,
            name: element.name,
            image: element.background_image,
            genres: element.genres?.map(g => g.name),
            
            releaseDate: element.released,
            rating: element.rating,
            platforms: element.platforms?.map(p => p.platform.name)
        }
    })
    console.log(apivideogames)
    const dbvideogames = await Videogame.findAll({
        include: {
            model: Genre,
        }
    })
    .then(data => data.map(video => {
        return {
            id: video.id,
            name: video.name,
            image: video.background_image,
            genres: video.genres.map(g => g.name),
           
           
            rating: video.rating,
           
        }
    }))

    const allgames = await dbvideogames.concat(apivideogames)

    if (name && name.trim() !=='') {
        const FilteredVideo = allgames.filter(element => element.name.toLowerCase().includes(name.toLowerCase()))
        return FilteredVideo
    }else{

        return allgames
    }
}



module.exports = allvideogamesName