import style from './Loader.module.css';
import marioFace from '../../loader1.gif'
const Loader = ({background}) => {

 
  return (
    <div className={style.loader} style={{background}}>
      <img src={marioFace} alt="Mario Face" className="loader-image" />
    </div>
  )
}

export default Loader;
