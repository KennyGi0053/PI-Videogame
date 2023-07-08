import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres } from "../../Redux/actions"
import axios from "axios"
import style from './Form.module.css'
import Loader from "../../Components/Loader/Loader"
const validate = (post) => {
    let errors = {};
  
    if (!post.name) {
      errors.name = 'Ingresa el nombre del videojuego';
    } else if (!/^[a-zA-Z\s]+$/.test(post.name)) {
      errors.name = 'El nombre solo debe contener letras y espacios';
    }
  
    if (!post.image) {
      errors.image = 'Ingresa la URL de una imagen representativa';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(post.image)) {
      errors.image = 'Ingresa una URL válida';
    }
  
    if (!post.description) {
      errors.description = 'Ingresa una descripción';
    } else if (post.description.length < 10) {
      errors.description = 'La descripción debe tener al menos 10 caracteres';
    }
  
    if (!post.platforms) {
      errors.platforms = 'Ingresa una plataforma';
    } else if (!/^[a-zA-Z\s]+$/.test(post.platforms)) {
      errors.platforms = 'La plataforma solo debe contener letras y espacios';
    }
  
    if (!post.releaseDate) {
      errors.releaseDate = 'Ingresa la fecha de lanzamiento';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(post.releaseDate)) {
      errors.releaseDate = 'Ingresa una fecha válida en formato YYYY-MM-DD';
    }
  
    if (!post.rating) {
      errors.rating = 'Ingresa una calificación';
    } else if (!/^[1-5]$/.test(post.rating)) {
      errors.rating = 'La calificación debe estar entre 1 y 5';
    }
  
    if (post.genres.length === 0) {
      errors.genres = 'Selecciona al menos un género';
    }
  
    return errors;
  };

const Form = () => {

    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    const [post, setPost] = useState ({
        name: "",
        image: "",
        description: "",
        platforms: "",
        releaseDate: "",
        rating:"",
        genres:[]
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost((prevPost) => ({
          ...prevPost,
          [name]: value,
        }));
        setErrors(validate({
          ...post,
          [name]: value,
        }));
    }

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validate(post);
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          alert('Por favor, completa todos los campos correctamente');
          return;
        }
      
        axios
          .post("http://localhost:3001/videogames", post)
          .then((res) => {
            alert('VideoGame creado exitosamente');
            setPost({
              name: "",
              image: "",
              description: "",
              platforms: "",
              releaseDate: "",
              rating: "",
              genres: [],
            });
            setErrors({});
          })
          .catch((err) => alert('Ocurrió un error al crear el VideoGame'));
      };

    
        const handleSelectGenres = (event) => {
            if(!post.genres.includes(event.target.value))
            setPost({
                ...post,
                genres: [...post.genres, event.target.value]
            })
            setErrors(validate({
                ...post,
                genres: [...post.genres, event.target.value]
            }))
        }

        // const handleGenreDelete = (genre) => {
        //     setPost({
        //         ...post,
        //         genres: post.genres.filter(element => element !== genre)
        //     })
        //     setErrors(validate({
        //         ...post,
        //         genres: [...post.genres]
        //     }))
        // }



return (
    <div className={style.loading}> 
        {loading ? (
            <Loader background="url('path/to/background-image.jpg')"/>
        ) : ( 
    <div className={style.create}>
    <form className={style.form} onSubmit={event => handleSubmit(event)}>
   <h1 className={style.h1}>Create VideoGame</h1>
   <div>
        <label className={style.label}>Name</label>
        <input className={style.inputname} type="text" value={post.name} name="name" onChange={event => handleInputChange(event)}/>
        {errors.name && (
            <p className={style.errname}>{errors.name}</p>
        )}
   </div>

   <div>
        <label className={style.labelimage}>Image</label>
        <input className={style.inputimage} type="url" value={post.image} name='image' onChange={event => handleInputChange(event)} placeholder="Enter image URL"/>
        {errors.image &&
        <p className={style.errimage}>{errors.image}</p>
        }
   </div>
   <div>

        <label className={style.description}>Description</label>
        <input className={style.inputdescrip} type="text" value={post.description} name='description' onChange={event => handleInputChange(event)} />
        {errors.description &&
        <p className={style.errdescription}>{errors.description}</p>
        }
   </div>

   <div>
        <label className={style.platforms}>Platforms</label>
        <input className={style.inputplat} type="text" value={post.platforms} name='platforms' onChange={event => handleInputChange(event)}/>
        {errors.platforms && 
        <p className={style.errplatforms}>{errors.platforms}</p>
        }
   </div>

   <div>
        <label className={style.release}>Release Date</label>
        <input className={style.inputrel} type="date" value={post.releaseDate} name='releaseDate' onChange={event => handleInputChange(event)}/>
        {errors.releaseDate && 
        <p className={style.errrelease}>{errors.releaseDate}</p>
        }
   </div>

   <div>
   <select className={style.rating} value={post.rating} onChange={event => handleInputChange(event)} name="rating">
   {errors.rating && 
        <p className={style.errrating}>{errors.rating}</p>}
    <option value="">-- Select a rating --</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
        
   </div>

   <div>
    <select className={style.genres} onChange={event => handleSelectGenres(event)} defaultValue='default'>
            <option value='default' disabled>Select Genres</option>
        {genres?.map((genre, index) => (
            <option value={genre.name} key={index}>{genre.name}</option>
        ))}
    </select>
    {errors.genres && (<p className={style.errgenres}>{errors.genres}</p>)}
    {/* {post.genres.map((index, genre) => 
    <div key={index}>
        <p>{genre}</p>
        <button  onClick={() => handleGenreDelete(genre)}>X</button>
    </div>
    
    )} */}
   </div>
   <button className={style.button} type= 'submit'>CREATE VIDEOGAME!</button>
   

   
    </form>
    
      
    </div>
        )}
</div>
          )
}

export default Form