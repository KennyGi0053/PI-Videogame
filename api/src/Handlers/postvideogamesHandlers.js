const postData = require('../Controllers/postvideogames')



const postvideogames = async(req,res) => {

    try {
        
        const { name, image, description, releaseDate, rating, platforms, genres} = req.body

        const videogame = await postData(name, image, description, releaseDate, rating, platforms, genres)

        res.status(201).json(videogame)

    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
    
}


module.exports = postvideogames