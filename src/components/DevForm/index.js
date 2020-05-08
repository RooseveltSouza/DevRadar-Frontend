import React, { useState, useEffect } from 'react';

import './style.css';

export default function DevForm({ onSubmit }) {
  const [github, setNome] = useState('');
  const [techs, setTechs] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        alert('Erro ao buscar a localização');
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({
      github,
      techs,
      latitude,
      longitude,
    });

    setNome('');
    setTechs([]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='input-block'>
        <label htmlFor='username'>Usúario do Github</label>
        <input
          name='username'
          id='username'
          value={github}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div className='input-block'>
        <label htmlFor='techs'>Tecnologias</label>
        <input
          name='techs'
          id='techs'
          value={techs}
          onChange={(e) => setTechs(e.target.value)}
          required
        />
      </div>

      <div className='input-group'>
        <div className='input-block'>
          <label htmlFor='lo'>Latitude</label>
          <input
            type='number'
            name='latitude'
            id='latitude'
            onChange={(e) => setLatitude(e.target.value)}
            value={latitude}
            required
          />
        </div>
        <div className='input-block'>
          <label htmlFor='longitude'>Longitude</label>
          <input
            type='number'
            name='longitude'
            id='longitude'
            onChange={(e) => setLongitude(e.target.value)}
            value={longitude}
            required
          />
        </div>
      </div>
      <button type='submit'>Salvar</button>
    </form>
  );
}
