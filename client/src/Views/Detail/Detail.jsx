import React from "react"
import { useEffect, useState } from "react"
import {  useParams } from 'react-router-dom'
import { getVideogame } from "../../Redux/actions"
import { useSelector, useDispatch } from 'react-redux'
import style from './Detail.module.css'
import Loader from "../../Components/Loader/Loader"
const Detail = () => {

    const { id } = useParams()
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVideogame(id))
    }, [dispatch, id])

 const [loading, setLoading] = useState(true);

   useEffect(() => {
     const timer = setTimeout(() => {
       setLoading(false);
     }, 2000);
     return () => clearTimeout(timer);
   }, []);


    const Videogame = useSelector((state) => state.Videogame)
    
    
   

    return (
        <div div className={style.loading}>
         {loading ? (
                 <Loader background="url('path/to/background-image.jpg')"/>
             ) : (

      <div className={style.container}>
        <h1 className={style.h1}>{Videogame.name}</h1>
        
        <img className={style.image} src={Videogame.image} alt="" />
        <div>
        <h2 className={style.description}>Description </h2>
        <article className={style.description1} dangerouslySetInnerHTML={{ __html:Videogame.description}} />
        </div>
        <div className={style.platforms}>
        <h3 className={style.plat}>Platforms </h3>
        <p className={style.key}>{Videogame.platforms}</p>

        </div>
        <div className={style.genres}>
         <h3>Genres </h3>
         <p> {Videogame.genres}</p>
         

        </div>
        <div className={style.release}>

        <h3 >ReleaseDate </h3>
        <p >{Videogame.releaseDate}</p>
        </div>
        
        <h3 className={style.rating}>Rating ⭐{Videogame.rating}</h3>
      </div>

      
             )}
     </div>
    //     <div className={style.loading}>

    //         {loading ? (
    //             <Loader background="url('path/to/background-image.jpg')"/>
    //         ) : (

            
    //     <div className={style.container}>
            
    //             <h1 className={style.h1}>{name}</h1>
    //                             <img className={style.image} src={background_image || image} alt=""/>
            
    //         <div className={style.description}>
    //             <h2>Description</h2>
    //             <article className={style.description} dangerouslySetInnerHTML={{ __html:description}} />
    //         </div>
    //         <div className={style.platforms}>
    //             <h2 className={style.plat}>Platforms</h2>
                   
    //             console.log(platforms,'hola')
    //             {platforms.map((platform) => (
                    
    //                 <p className={style.key} key={platform}>{platform}</p>
    //             ))}
                
    
    //         </div>
    //         <div className={style.genres}>
    //             <h2>Genres</h2>
                
                    
    //                     {genres.map((genre) => (
    //                         <p key={genre}>{genre}</p>
    //                     ))}
                    
                
    //         </div>
    //         <div>
    //             <h3 className={style.release}>Release Date {releaseDate}</h3>
    //             <h3 className={style.rating}>Rating ⭐{rating}</h3>
    //         </div>
            
    //     </div>
              
    //     )}
    //     </div>
     )
}


export default Detail