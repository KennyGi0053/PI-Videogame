import React from "react"
import Card from "../Card/Card"
import style from './CardsContainer.module.css'
import { useSelector } from "react-redux"



const CardsContainer = () => {

const Videogames = useSelector(state=>state.Videogames)
    return(
        

        <div className={style.Container}>
            {Videogames.map(videogame => {
                return <Card 
                id={videogame.id}
                name={videogame.name}
                genres ={videogame.genres}
                platforms={videogame.platforms}
                image={videogame.image}
                rating={videogame.rating}
                key={videogame.id}
                />
                
                
            })}
            
        
            </div>
    )
}

export default CardsContainer