const { Router } = require('express')
const videogamesId = require('../Handlers/videogamesIdHandlers')
const videogamesName = require('../Handlers/videogamesNameHandlers')
const postvideogames = require('../Handlers/postvideogamesHandlers')
const videogames = require('../Handlers/videogamesHandlers')
const deleteVideogame = require('../Handlers/deleteVideogame')
const videogamesRouter = Router()





videogamesRouter.get('/', videogames)

videogamesRouter.get('/name', videogamesName)

videogamesRouter.get('/:id', videogamesId)

videogamesRouter.post('/', postvideogames)

videogamesRouter.delete('/:id', deleteVideogame)


module.exports = videogamesRouter