import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default (props) => {
    const [movie, setMovie] = useState({
        id: 0,
        title: "-",
        director: "-",
        metascore: 0,
        stars: ["-"]
    });

    useEffect(() => {
    fetchMovie(props.match.params.id);
    
    },[])

    const fetchMovie = id => {
        axios
        .get(`https://localhost:7000/api/movies/${id}`)
        .then(res => console.log(res.data);
                    setMovie(res.data):
        })
        .catch(error => console.log(error.response));
    };
    
    const onSubmit = (event) => {
        event.preventDefault();
        axios
        .get(`https://localhost:7000/api/movies/${movie.id}`, movie)
        .then(res => console.log(res.data);
                    setMovie(res.data);
                    props.history.push(`/`);
        })
        .catch(error => console.log(error.response));
    }
    
    const onChange = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    return(
        <div className="movie-list">
            <h2>Update Movie</h2>
            <div>
                <form onSubmit={onSubmit}>
                    <div className="movie-card">
                        <h3><input 
                            value={movie.title}
                            name='title'
                            onChange={onChange} />
                        </h3>
                        <h3><input 
                            value={movie.director}
                            name='director'
                            onChange={onChange} />
                        </h3>
                        <h3><input 
                            value={movie.metascore}
                            name='metascore'
                            onChange={onChange} />
                        </h3>
                        <h4>Movie Stars: </h4>
                        {movie.stars.map(star => (
                            <div key={star} className='movie-star'>
                            {star}
                            </div>
                        ))}
                        <button className="edit-btn">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>  
        </div>    
    )
}

