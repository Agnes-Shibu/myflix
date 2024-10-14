import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/constants';
import YouTube from 'react-youtube';

function Banner() {
  const [urlId, setUrlId] = useState('');
  const [movie, setMovie] = useState();

  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data.results[6]);
      })
      .catch(err => {
        alert('Network Error');
      });
  }, []);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          console.log('Trailer Not Available!!!');
        }
      });
  };

  const handleBack = () => {
    setUrlId(''); // This will clear the video and hide the YouTube player
  };

  return (
    <div
      style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})` }}
      className='banner'>
      <div className='content'>
        <h1 className='title'>{movie ? movie.title : ""}</h1>
        <div className='banner_btns'>
          {!urlId && <button onClick={() => handleMovie(movie.id)} className='button'>Play</button>}
          <button className='button'>My List</button>
        </div>
        <h4 className='description'>{movie ? movie.overview : ""}</h4>
      </div>
      <div className="fade"></div>

      {/* Render YouTube player when urlId is set */}
      {urlId && (
        <>
          <div className="youtube-player">
            <YouTube opts={opts} videoId={urlId.key} />
          </div>
          {/* Back button to stop the video */}
          <button className='back-button' onClick={handleBack}>Back</button>
        </>
      )}
    </div>
  );
}

export default Banner;
