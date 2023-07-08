import React from "react";
import style from './Paginated.module.css'




const Paginated = ({videogamesPerPage, allvideogames, paginated, currentPage, setCurrentPage}) => {
    
    const pageNumbers = []

    for (let i=0; i < Math.ceil(allvideogames/videogamesPerPage); i++) {
        pageNumbers.push(i+1)
    }

    const totalPages = Math.ceil(allvideogames/videogamesPerPage)
    
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages) )
    }
    return (
        <div className={style.container}>
            
                <button className={style.prev} onClick={handlePrevPage}
                disabled={currentPage === 1}>Prev</button>

            
            <div>
                {
                    pageNumbers?.map(number => (
                        <p className={style.container} key={number}>
                            <button className={style.butt} onClick={() => paginated(number)}>{number}</button>
                        </p>
                    ))
                }
            </div>
                <button className={style.next} onClick={handleNextPage}
                disabled={currentPage === totalPages}>Next</button>
            
        </div>
    )
}


export default Paginated