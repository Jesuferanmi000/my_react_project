import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';
import axios from 'axios'

const API_URL = 'https://www.omdbapi.com?apikey=871b6280';

const movie1 = {
    
        "Title": "Amazing Spiderman Syndrome",
        "Year": "2012",
        "imdbID": "tt2586634",
        "Type": "movie",
        "Poster": "N/A"
    
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await axios.get(`${API_URL}&s=${title}`)        
        const data = await response.data;
        
        setMovies(data.Search);  
    }

    useEffect(() => {
        if (searchTerm) {
            searchMovies(searchTerm);
        }
    }, [searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm);
        }
    };

    return (
      <div className="app">
        <h1>Movie-Verse</h1>

        <div className="search">
            <input 
                placeholder="search for movies" 
                value={searchTerm} 
                onChange={handleSearch}
                onKeyPress={handleKeyPress}
            />
            <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}/>
        </div>

        { movies?.length > 0
            ? (
                <div className="container">
                    {movies.map((movie) => (<MovieCard movie={movie}/>))}
                </div>
            ) : (
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>
            )}
      </div>
    );
}


export default App;