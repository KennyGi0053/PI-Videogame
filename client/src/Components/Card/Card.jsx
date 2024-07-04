import React from "react"
import style from './Card.module.css'
import { Link } from "react-router-dom"
const Card = (props) => {
    
    const id = props.id
    return(
        <div className={style.container}>

        <div className={style.card}>
            <p className={style.name}>{props.name}</p>
            <Link to={`/detail/${id}`} >
            <img className= {style.image}src={props.image} alt="" />
            </Link>
            <p className={style.genre}>Genres: {props.genres}</p>
         
            <p className={style.rating}>Rating ⭐{props.rating}</p>


            
        </div>
        </div>
    )
}


export default Card