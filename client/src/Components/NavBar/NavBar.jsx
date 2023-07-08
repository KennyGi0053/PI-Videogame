import { Link } from "react-router-dom"
import style from './NavBar.module.css'

const NavBar = () => {

    return(
        <div className={style.Container}>
            <Link className={style.home} to='/home'>Home </Link>
            <Link className={style.form} to= '/form'>Create VideoGame</Link>
            <Link className={style.about} to= '/'>About</Link>
        </div>
    )
}


export default NavBar