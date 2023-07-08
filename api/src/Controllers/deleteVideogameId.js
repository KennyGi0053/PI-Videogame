const { Videogame } = require('../db')




const deleteVideogameId = async(id) => {

    await Videogame.destroy({
        where: {
            id: id,
        }
    })
}





module.exports = deleteVideogameId