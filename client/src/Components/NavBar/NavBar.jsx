import { Link } from "react-router-dom"
import style from './NavBar.module.css'

const NavBar = () => {

    return(
        <div className={style.Container}>
            <Link to= '/'>About</Link>
            <Link to='/home'>Home </Link>
            <Link to= '/form'>Create VideoGame</Link>
        </div>
    )
}


export default NavBar