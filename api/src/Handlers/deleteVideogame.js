const deleteVideogameId = require ('../Controllers/deleteVideogameId')



const deleteVideogame = async(req,res) => {

    const { id } = req.params
    try {

      await deleteVideogameId(id)

        res.status(200).json ({message: 'Videogame deleted successfully'})
    } catch (error) {
        
        res.status(500).json({error: error.message})
    }
}





module.exports = deleteVideogame