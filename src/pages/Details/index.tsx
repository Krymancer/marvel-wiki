import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import api from '../../api';
import { publicKey } from '../../utils/apiConstants';

import HeroDetails from '../../components/HeroDetails';

import './index.css';

interface Params {
  id: string;
}

interface Character {
  id: string;
  name: string;
  description: string;
  comics: {
    avaliable: number;
    items: [{ name: string }];
  };
  series: {
    avaliable: number;
    items: [{ name: string }];
  };
  stories: {
    avaliable: number;
    items: [{ name: string }];
  };
  thumbnail: {
    extension: string;
    path: string;
  };
}

interface APIResponse {
  data: {
    results: Character[];
  };
}

const Details: React.FC<RouteComponentProps<Params>> = (
  props: RouteComponentProps<Params>,
) => {
  const { id } = props.match.params;
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    const data = loadCharacter();
    data.then((result) => {
      setCharacter(result);
      console.log('result', result);
    });
    // Disable error with empty dependeces, as so this effect needs to run only once
    // eslint-disable-next-line
  }, []);

  /**
   * Fecth the characters from API
   * @return {Promise<ResultInterface[]>} The selected characters
   */
  async function loadCharacter(): Promise<Character> {
    const URI = 'characters/' + id + '?apikey=' + publicKey;
    return await api<APIResponse>('GET', URI).then((result) => {
      return result.data.data.results[0];
    });
  }

  return (
    <div className="details-container">
      {character === null ? null : (
        <HeroDetails
          name={character?.name}
          thumbnail={
            character?.thumbnail.path + '.' + character?.thumbnail.extension
          }
          description={character?.description}
        />
      )}
    </div>
  );
};

export default Details;
