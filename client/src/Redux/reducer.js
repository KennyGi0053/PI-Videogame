import { GET_GENRES, GET_VIDEOGAME, GET_VIDEOGAMES, ORDER_BY_NAME, ORDER_BY_RATING, FILTER_BY_GENRES, GET_SEARCH_BY_NAME, GET_RESET, GET_RESET_ORDER, GET_DB_GAMES, POST_VIDEO_GAMES} from "./actions"


const initialState = {
    Videogames: [],
    Videogame: [],
    genres: [],
    allVideogames: [],
    Order: [],
    Filtered: []
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_VIDEOGAMES:
            return {...state,
            Videogames:action.payload,
            allVideogames:action.payload,
            Order: action.payload
            }
            
            case GET_VIDEOGAME:
                return {
                    ...state,
                    Videogame:action.payload
                }
                case GET_GENRES:
                    return {
                        ...state, genres: action.payload
                    }
                    case GET_SEARCH_BY_NAME:
                        return {
                            ...state,
                            Videogames:action.payload
                        }
                        case FILTER_BY_GENRES:

                        const allVideogames = state.allVideogames
                        const VideogamesWithGenre = action.payload === 'all' 
                        
                        ? allVideogames 
                        
                        : allVideogames.filter(video => video.genres.includes(action.payload))
                        return {
                            ...state,
                            Videogames: VideogamesWithGenre,
                            
                        }

                        case ORDER_BY_NAME:
                            const VideogamesSorted = action.payload === 'asc' ?
                            state.Videogames.sort((a,b) => {
                                if (a.name > b.name) return 1
                                if (b.name > a.name) return -1
                                return 0
                            }) :
                            state.Videogames.sort((a,b) => {
                                if (a.name > b.name) return -1
                                if(b.name > a.name) return 1
                                return 0
                            })
                            return {
                                ...state,
                                Videogames: VideogamesSorted
                            }
                            case ORDER_BY_RATING:
                                const VideogamesByRating = action.payload === 'asc' ?
                                state.Videogames.sort((a,b) => {
                                    if (a.rating > b.rating) return 1
                                    if (b.rating > a.rating) return -1
                                    return 0
                                }) :
                                state.Videogames.sort((a,b) => {
                                    if (a.rating > b.rating) return -1
                                    if (b.rating > a.rating) return 1
                                    return 0
                                })
                                return {
                                    ...state,
                                    Videogames: VideogamesByRating
                                }
                                case GET_RESET: 
                                
                                return {
                                    ...state,
                                    Videogames: state.allVideogames,
                                    
                                }
                                case GET_RESET_ORDER:
                                return {
                                    ...state, 
                                    Videogames: [...state.allVideogames]

                                }
                                case GET_DB_GAMES:
                                    const dbApi = action.payload === 'db'
                                    ? state.allVideogames.filter(game => game.id.toString().includes('-'))
                                    : action.payload === 'api'
                                    ? state.allVideogames.filter(game => !game.id.toString().includes('-'))
                                    : [...state.allVideogames]
                                return {
                                    ...state,
                                    Videogames:dbApi
                                }
                                // case DELETE_VIDEOGAME:
                                //     const updatedVideogames = state.Videogames.filter(
                                //         (video) => video.id !== action.payload
                                //     )
                                //     return {
                                //         ...state,
                                //         Videogames: updatedVideogames
                                //     }
                                case POST_VIDEO_GAMES:
                                    return {
                                        ...state,
                                    }

        default:
            return {...state}
    }
}

export default rootReducer