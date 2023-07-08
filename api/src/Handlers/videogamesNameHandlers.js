const allvideogamesName = require('../Controllers/getvideogamesName')




const videogamesName = async(req,res) => {
    
    const { name } = req.query
    
    try {
        
            const apiName = await allvideogamesName(name)
            res.status(200).json(apiName)
       
    } catch (error) {
        
        res.status(400).json({error: error.message})
    }
}


module.exports = videogamesName