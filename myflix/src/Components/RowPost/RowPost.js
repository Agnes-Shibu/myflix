import React, { useEffect, useState } from 'react';
import './RowPost.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/constants';
import YouTube from 'react-youtube';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');

  useEffect(() => {
    axios.get(props.url).then((response) => {
      setMovies(response.data.results);
    });
  }, [props.url]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
      if (response.data.results.length !== 0) {
        setUrlId(response.data.results[0]);
      } else {
        console.log('Trailer Not Available!!!');
      }
    });
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => (
          <img
            key={obj.id} 
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            src={`${imageUrl + obj.backdrop_path}`}
            alt="poster"
          />
        ))}
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  );
}

export default RowPost;
