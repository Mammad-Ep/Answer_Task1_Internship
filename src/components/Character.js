import React, { useEffect, useState } from 'react';
import { useGetCharacterQuery } from '../app/services/RickAndMortyApi';
import { useNavigate, useParams } from 'react-router-dom';
import "../css/main-style5.scss";
// _____________________________________________________________________

const Character = () => {
  const params = useParams();
  const { data: characters, isLoading, isFetching, isError, error } = useGetCharacterQuery(Number(params.page));
  const [characterInfo, setCharacterInfo] = useState({});
  const [locationOriginEpisode, setLocationOriginEpisode] = useState({ location: "", origin: "", episodeCount: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const id = params.id;

    if (!isFetching) {
      const temp = characters.results.filter(ch => ch.id == Number(id));
      const ch = temp[0]
      setCharacterInfo(ch);
      setLocationOriginEpisode({ location: ch.location.name, origin: ch.origin.name, episodeCount: ch.episode.length })
    }
  }, [characters]);


  const BackHome = () => {
    navigate('/')
  };

  if (isError || error) {
    return <h2>Error is: {error.message}</h2>

  }

  if (isFetching || isLoading) {
    return <h3>Loading ...</h3>
  }

  { }
  return (
    <div className='character-details'>
      <img src={characterInfo.image} alt={characterInfo.name} />
      <h2>{characterInfo.name}</h2>

      <div>
        <p>
          <span>Status :</span> <strong>{characterInfo.status}</strong>
        </p>
        <p>
          <span>Species :</span> <strong>{characterInfo.species}</strong>
        </p>
      </div>
      <hr className='hr-morty' />
      <div>
        <p><span>Location:</span> <strong>{locationOriginEpisode.location}</strong></p>
        <p><span>Origin:</span> <strong>{locationOriginEpisode.origin}</strong></p>
      </div>
      <hr className='hr-morty' />
      <div>
        {characterInfo.type !== "" && (
          <p>
            <span>Type: </span><strong>{characterInfo.type}</strong>
          </p>
        )}
        {characterInfo.gender !== "" && (
          <p>
            <span>Gender: </span><strong>{characterInfo.gender}</strong>
          </p>
        )}
      </div>
      <hr className='hr-morty' />
      <div>
        <p><span>Created: </span><strong>{characterInfo.created}</strong></p>
        <p><span>Episode Count: </span> <strong>{locationOriginEpisode.location}</strong></p>
      </div>

      <button type="button" className='return-characters' onClick={BackHome}>Return Home</button>
    </div>

  )
}

export default Character