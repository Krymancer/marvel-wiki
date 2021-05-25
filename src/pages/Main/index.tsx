import React, { useState } from 'react';

import InfiniteScroll from 'react-infinite-scroller';

import HeroCard from '../../components/HeroCard';
import HeroCardShimmer from '../../components/HeroCardShimmer';

import api from '../../api';
import { publicKey } from '../../utils/apiConstants';
import { APIResponse, ResultInterface } from '../../api/interfaces';

import './index.css';

const Main: React.FC = () => {
  const [characters, setCharacters] = useState<ResultInterface[]>([]);
  const charactersLimit = 1493;
  /**
   * Update Characetrs List
   */
  function updateCharacters(): void {
    const data = loadCharacters();
    data.then((result) => setCharacters(characters.concat(result)));
  }

  /**
   * Fecth the characters from API
   * @return {Promise<ResultInterface[]>} The selected characters
   */
  async function loadCharacters(): Promise<ResultInterface[]> {
    const URI =
      'characters?apikey=' +
      publicKey +
      '&limit=20&offset=' +
      characters.length;
    return await api<APIResponse>('GET', URI).then((result) => {
      return result.data.data.results;
    });
  }

  const loader = (
    <>
      <HeroCardShimmer key={'loader1'} />
      <HeroCardShimmer key={'loader2'} />
      <HeroCardShimmer key={'loader3'} />
      <HeroCardShimmer key={'loader4'} />
      <HeroCardShimmer key={'loader5'} />
    </>
  );

  const items = characters.map((character) => (
    <HeroCard
      key={character.id}
      name={character.name}
      thumbnail={character.thumbnail.path + '.' + character.thumbnail.extension}
    />
  ));

  return (
    <InfiniteScroll
      key={'infinitescroll'}
      className="container"
      pageStart={20}
      loadMore={updateCharacters}
      hasMore={characters.length < charactersLimit}
      loader={loader}
    >
      {items}
    </InfiniteScroll>
  );
};

export default Main;
