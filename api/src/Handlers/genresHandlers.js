const { Genre } = require('../db')
const allgenres = require('../Controllers/getgenres')



const genres = async(req,res) => {

    try {
        const genresAll = await allgenres()

        res.status(200).json(genresAll)
    } catch (error) {

        res.status(400).json({error: error.message})
        
    }
    
}

module.exports = genres;