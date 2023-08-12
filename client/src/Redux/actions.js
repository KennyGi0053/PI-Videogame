import axios from 'axios'


export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'
export const getVideogames = () => {   
    return async(dispatch) => {
        const apiData = await axios.get(`/videogames`)
        
        const Videogames = apiData.data
        dispatch({
            type:GET_VIDEOGAMES,
            payload: Videogames
        })
    }
}

export const GET_VIDEOGAME = 'GET_VIDEOGAME'
export const getVideogame = (id) => {
    return async(dispatch) => {
        const apiData =await axios.get(`/videogames/${id}`)
        
        const Videogame = apiData.data
        console.log(apiData)
        dispatch({ 
            type: GET_VIDEOGAME,
            payload: Videogame
        })
    }
}

export const GET_GENRES = 'GET_GENRES'

export const getGenres = () => {
    return async(dispatch) => {
        const apiData = await axios.get(`/genres`)
        const genres = apiData.data
        return dispatch({
            type: GET_GENRES,
            payload: genres
        })
    }
}

export const FILTER_BY_GENRES = 'FILTER_BY_GENRES'

export const filterByGenres = (payload) => {
    return {
        type: FILTER_BY_GENRES,
        payload
    }
}

export const ORDER_BY_NAME = 'ORDER_BY_NAME'

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const ORDER_BY_RATING = 'ORDER_BY_RATING'

export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export const GET_SEARCH_BY_NAME = 'GET_SEARCH_BY_NAME'

export const searchByName = (name) => {
    return async (dispatch) => {
        const apiData = await axios.get(`/videogames/name?name=${name}`)
        const Videogames = apiData.data
        console.log(apiData.data)
        return dispatch({
            type: GET_SEARCH_BY_NAME,
            payload: Videogames
        })
    }
}

export const GET_RESET = 'GET_RESET'

export const getReset = () => {
    return ({
        type: GET_RESET,
       
    })
}

export const GET_RESET_ORDER = 'GET_RESET_ORDER'

export const getResetOrder = () => {
    return {
        type: GET_RESET_ORDER,
    }
}


// export const DELETE_VIDEOGAME = 'DELETE_VIDEODAME'

// export const deleteVideogame = (id) => {
//     return async (dispatch) => {

//       const Videogames = await axios.delete(`http://localhost:3001/videogame/${id}`)
    
//         dispatch({
//             type:DELETE_VIDEOGAME,
//             payload: Videogames
//         })
//     }

    
// }
export const GET_DB_GAMES = 'GET_DB_GAMES'
export const getDbGames = (payload) => {
    return {
        type: GET_DB_GAMES,
        payload: payload
    }
}


export const POST_VIDEO_GAMES = 'POST_VIDEO_GAMES'

export const postVideogames = (payload) => {

    return async (dispatch) => {
        const response = await axios.post('/videogames',payload)
        return response
    }
}