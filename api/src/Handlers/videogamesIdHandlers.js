const allvideogamesId = require('../Controllers/getvideogamesId')




const videogamesId = async(req,res) => {

    const { id } = req.params

    try {
        const videoId = await allvideogamesId(id)

        res.status(200).json(videoId)
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }

}


module.exports = videogamesId