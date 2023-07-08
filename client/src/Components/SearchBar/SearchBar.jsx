import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../Redux/actions";
import style from './SearchBar.module.css'

const SearchBar = ({returnToFirstPage}) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')


    const handleChange = (event) => {
        event.preventDefault()
        setName(event.target.value)
        console.log(name)
    }

    const handleButton = (event) => {
        event.preventDefault()
        if (name.trim() === "") {
            // El campo de entrada está vacío, no se realiza la búsqueda
            return;
          }
         dispatch(searchByName(name))
        .then(() => {returnToFirstPage()})
    }
    

    return (
        <div className={style.container}>
            
            <input className={style.input} type='text' placeholder="Search by Name" onChange={(event) => handleChange(event)} />

           
            <button className={style.button} type="submit" onClick={(event) => handleButton(event)}>Search</button>
        </div>

    )
}


export default SearchBar