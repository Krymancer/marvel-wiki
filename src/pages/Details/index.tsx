import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

import api from '../../api';
import { CharacterDataWrapper, Character } from '../../api/interfaces';
import { publicKey } from '../../utils/apiConstants';

import HeroDetails from '../../components/HeroDetails';

import './index.css';

interface Params {
  id: string;
}

const Details: React.FC<RouteComponentProps<Params>> = (
  props: RouteComponentProps<Params>,
) => {
  const { id } = props.match.params;
  const [character, setCharacter] = useState<Character>();

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    loadCharacter();
    return () => source.cancel();
    // Disable error with empty dependeces, as so this effect needs to run only once
    // eslint-disable-next-line
  }, []);

  /**
   * Fecth the characters from API
   */
  function loadCharacter(): void {
    const URI = 'characters/' + id;
    const params = {
      apikey: publicKey,
    };

    try {
      api<CharacterDataWrapper>('GET', URI, params).then((axiosResponse) => {
        const response = axiosResponse.data.data; // Extracting data from axios response
        setCharacter(response?.results?.pop());
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Marvel API request got cancelled');
      } else {
        throw error;
      }
    }
  }
  /**
   * Get the thumbnail path
   *
   * @return {string} thumbnail path
   */
  function getThumbnail(): string {
    return character?.thumbnail?.path + '.' + character?.thumbnail?.extension;
  }

  return (
    <div className="details-container">
      {character === null ? null : (
        <HeroDetails
          name={character?.name}
          thumbnail={getThumbnail()}
          description={character?.description}
        />
      )}
    </div>
  );
};

export default Details;
