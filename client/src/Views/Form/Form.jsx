import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres } from "../../Redux/actions"
import axios from "axios"
import style from './Form.module.css'
import Loader from "../../Components/Loader/Loader"
const validate = (post) => {
    let errors = {};
  
    if (!post.name) {
      errors.name = 'Enter the name of the game';
    } else if (!/^[a-zA-Z\s]+$/.test(post.name)) {
      errors.name = 'The name must only contain letters and spaces';
    }
  
    if (!post.image) {
      errors.image = 'Enter the URL of a representative image';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(post.image)) {
      errors.image = 'Please enter a valid URL';
    }
  
    if (!post.description) {
      errors.description = 'Enter a description';
    } else if (post.description.length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }
  
    if (!post.platforms) {
      errors.platforms = 'Enter a platform';
    } else if (!/^[a-zA-Z0-9\s]+$/.test(post.platforms)) {
      errors.platforms = 'The platform must only contain letters, numbers and spaces';
    }
  
    if (!post.releaseDate) {
      errors.releaseDate = 'Enter the release date';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(post.releaseDate)) {
      errors.releaseDate = 'Please enter a valid date in YYYY-MM-DD format';
    }
  
    if (!post.rating) {
      errors.rating = 'Enter a rating';
    } else if (!/^[1-5]$/.test(post.rating)) {
      errors.rating = 'The rating must be between 1 and 5';
    }
  
    if (post.genres.length === 0) {
      errors.genres = 'Select at least one genre';
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
          alert('Please fill in all the fields correctly');
          return;
        }
      
        axios
          .post("http://localhost:3001/videogames", post)
          .then((res) => {
            alert('VideoGame created successfully');
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
          .catch((err) => alert('An error occurred while creating the VideoGame'));
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
      <div className={style.form}> 

    <form onSubmit={event => handleSubmit(event)}>
   <h1 className={style.h1}>Create VideoGame</h1>
   <div >
        <label style={style.label}>Name</label>
        <input  type="text" value={post.name} name="name" onChange={event => handleInputChange(event)}/>
        {errors.name && (
            <p className={style.errors}>{errors.name}</p>
        )}
   </div>

   <div>
        <label className={style.label}>Image</label>
        <input  type="url" value={post.image} name='image' onChange={event => handleInputChange(event)} placeholder="Enter image URL"/>
        {errors.image &&
        <p className={style.errors}>{errors.image}</p>
        }
   </div>
   <div>

        <label >Description</label>
        <input  type="text" value={post.description} name='description' onChange={event => handleInputChange(event)} />
        {errors.description &&
        <p className={style.errors}>{errors.description}</p>
        }
   </div>

   <div>
        <label >Platforms</label>
        <input  type="text" value={post.platforms} name='platforms' onChange={event => handleInputChange(event)}/>
        {errors.platforms && 
        <p className={style.errors}>{errors.platforms}</p>
        }
   </div>

   <div>
        <label>Release Date</label>
        <input className={style.date} type="date" value={post.releaseDate} name='releaseDate' onChange={event => handleInputChange(event)}/>
        {errors.releaseDate && 
        <p className={style.errors}>{errors.releaseDate}</p>
        }
   </div>

   <div>
   <select className={style.rating} value={post.rating} onChange={event => handleInputChange(event)} name="rating">
   {errors.rating && 
        <p className={style.errors}>{errors.rating}</p>}
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
    {errors.genres && (<p className={style.errors}>{errors.genres}</p>)}
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
    </div>
        )}
</div>
          )
}

export default Form