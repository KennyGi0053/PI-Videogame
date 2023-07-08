import React, { useState } from "react"
import { getGenres, getVideogames, filterByGenres, orderByName, orderByRating, getReset, getResetOrder, getDbGames } from "../../Redux/actions"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Paginated from "../../Components/Paginated/Paginated"
import SearchBar from '../../Components/SearchBar/SearchBar'
import Loader from "../../Components/Loader/Loader"
import Card from '../../Components/Card/Card'
import style from './Home.module.css'
const Home = () => {

    const dispatch = useDispatch()
    const allvideogames = useSelector(state => state.Videogames)
    
    const genres = useSelector(state => state.genres)
    const [order, setOrder] = useState(true)
    
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

    useEffect(() => {
        dispatch(getVideogames())
    },[dispatch])

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const handleFilterByGenres = (event) => {
        dispatch(filterByGenres(event.target.value))
        setCurrentPage(1)
    }

    const handleOrderByName = (event) => {
        
        dispatch(orderByName(event.target.value))
        order ? setOrder(false) : setOrder(true)
        setCurrentPage(1)
    }

    const handleOrderByRating = (event) => {
        dispatch(orderByRating(event.target.value))
        order ? setOrder(false) : setOrder(true)
        setCurrentPage(1)
    }

    const handleReset = () => {
        dispatch(getReset())
        dispatch(getResetOrder())
        setCurrentPage(1)
        
    }

    const handleCreateapi = (event) => {
        dispatch(getDbGames(event.target.value))
        setCurrentPage(1)
    }


    // const handleDelete = (id) => {
    //     dispatch(deleteVideogame(id))
    //     console.log(id)
    // }

    const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage] = useState(15)
    const indexOfLastvideogames = currentPage * videogamesPerPage
    const indexOfFirstvideogames = indexOfLastvideogames - videogamesPerPage
    const currentvideogames = allvideogames.slice(indexOfFirstvideogames, indexOfLastvideogames)

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const returnToFirstPage = () => {
        setCurrentPage(1)
    }

    
return (
    < div className={style.loading}>
    {loading ? (
        <Loader background="url('path/to/background-image.jpg')" />
    ) : (
    <div className={style.container}>
        <div>
            <SearchBar returnToFirstPage={returnToFirstPage}/>
            <div className={style.azcon}>

            <select className={style.az} onChange={event => handleOrderByName(event)} defaultValue='default'>
                <option value = 'default' disabled>Alphabetical Order</option>
                <option value='asc'>A-Z</option>
                <option value= 'desc'>Z-A</option>
            </select>
            </div>

            <div className={style.ratcon}>
            <select className={style.rating} onChange={event => handleOrderByRating(event)} defaultValue='default'>
            <option value='default' disabled>Order by Rating</option>
            <option value='desc'>Higher ↑</option>
            <option value='asc'>Lower ↓</option>
            </select>
            </div>
            
            <div>
            <button className={style.reset} onClick={handleReset}>Reset Filters</button>
            </div>

            <div className={style.gencon}>

            <select className={style.gen} onChange={event => handleFilterByGenres(event)} defaultValue='default'>
            <option value='default' disabled>Select by Genre</option>
            {
                genres?.map(gen => (
                    <option value={gen.name} key={gen.id}>{gen.name}</option>
                    
                    ))
                }
            </select>
            </div>

            <div>
                <select className={style.apidb} onChange={handleCreateapi}> Created and Api
                <option value="">All</option>
                <option value="api" >Api</option>
                <option value="db">Created</option>
                </select>
            </div>

        </div>
        <Paginated 
        videogamesPerPage={videogamesPerPage}
        allvideogames = {allvideogames.length}
        paginated={paginated}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
        <div className={style.card}>

        {currentvideogames?.map((cu) => {
            
            return (
                
                <div className={style.card1} key={cu.id}>
                    <Card id={cu.id}name={cu.name} image={cu.image} genres={cu.genres} platforms={cu.platforms} rating={cu.rating} key={cu.id}/>
                    {/* <button onClick={() => handleDelete(cu.id)}>X</button> */}
                     </div>
            )
        })}
        </div>
        

        {/* {allvideogames?.map((video) => (
            <div key={video.id}>
                <p>{video.name}</p>
                <button onClick={() => handleDelete(video.id)}>X</button>
            </div>
        ))} */}


       
    </div>
    )
}
        </div>
)

}



export default Home