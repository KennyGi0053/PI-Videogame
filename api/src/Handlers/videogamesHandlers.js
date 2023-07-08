const getvideogames = require('../Controllers/getvideogames')





const videogames = async(req,res) => {

    try {
        
        const allgames = await getvideogames()

        res.status(200).json(allgames)
    } catch (error) {
        
        res.status(400).json({ error: error.message})
    }
    
}


module.exports = videogames