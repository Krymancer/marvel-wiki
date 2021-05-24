import React, { useState, useEffect } from 'react';
import HeroCard from './components/HeroCard';

import { publicKey } from './utils/apiConstants';
import api from './api';
import { APIResponse, ResultInterface } from './api/interfaces';

import './App.css';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<ResultInterface[]>([]);

  useEffect(() => {
    const URI = 'characters?apikey=' + publicKey + '&limit=100';
    api<APIResponse>('GET', URI).then((result) => {
      const data = result.data.data.results;
      setCharacters(data);
    });
  }, []);

  return (
    <div className="container">
      {characters.length > 0
        ? characters.map((character) => {
            return (
              <HeroCard
                key={character.id}
                name={character.name}
                thumbnail={
                  character.thumbnail.path + '.' + character.thumbnail.extension
                }
              />
            );
          })
        : null}
    </div>
  );
};

export default App;
