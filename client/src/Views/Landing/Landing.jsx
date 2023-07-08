import { Link } from "react-router-dom";
import style from './Landing.module.css'
import { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";

const Landing = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      }, []);

    return (
        <div className={style.loading}>
            {loading ? (
                <Loader background="url('path/to/background-image.jpg')"/>
            ) : (

           

        <div className={style.general}>   
       
        <Link to='/home'>
        <button className={style.button}>Click to Home</button>
        </Link>
        <h3 className={style.title}>PI - VIDEOGAMES</h3>
          <h3 className={style.letras}>Individual project created for ¡Soy Henry! </h3>
        
          <h3 className={style.letras}>By: Kenny Perez</h3>
        </div>
         
         )}
          </div>
    )
}


export default Landing;