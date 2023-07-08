const { Router } = require('express')
const genres = require('../Handlers/genresHandlers')



const genresRouter = Router()


genresRouter.get('/', genres)


module.exports = genresRouter