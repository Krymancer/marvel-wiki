import React, { useState, useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroller';

import HeroCard from '../../components/HeroCard';
import HeroCardShimmer from '../../components/HeroCardShimmer';
import SearchBar from '../../components/SearchBar';

import api from '../../api';
import { publicKey } from '../../utils/apiConstants';
import { APIResponse, ResultInterface } from '../../api/interfaces';

import './index.css';
import _ from 'underscore';

const Main: React.FC = () => {
  const [characters, setCharacters] = useState<ResultInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const charactersLimit = 1493;

  useEffect(() => {
    updateCharacters();
    // eslint-disable-next-line
  }, [searchTerm]);

  /**
   * Update Characetrs List
   * @param {ResultInterface[]} result result
   */
  function makeCharactersArray(result: ResultInterface[]): void {
    const restultUniques = _.uniq(result);
    setCharacters(restultUniques);
  }

  /**
   * Update Characetrs List
   */
  function updateCharacters(): void {
    const data = loadCharacters();
    if (searchTerm == '' && !hasSearched) {
      data.then((result) => makeCharactersArray(characters.concat(result)));
    } else if (searchTerm == '' && hasSearched) {
      data.then((result) => makeCharactersArray(result));
      setHasSearched(!hasSearched);
    } else if (searchTerm != '' && hasSearched) {
      console.log('esse');
      data.then((result) => makeCharactersArray(result));
    } else {
      data.then((result) => makeCharactersArray(result));
      setHasSearched(!hasSearched);
    }
  }

  /**
   * Update Characetrs List
   *
   * @param {string} term search term
   */
  function handleSearch(term: string): void {
    setSearchTerm(term);
  }

  /**
   * Fecth the characters from API
   * @return {Promise<ResultInterface[]>} The selected characters
   */
  function loadCharacters(): Promise<ResultInterface[]> {
    let URI = 'characters?apikey=' + publicKey;

    if (searchTerm != '') {
      URI += '&nameStartsWith=' + searchTerm;
    } else {
      '&limit=20&offset=' + characters.length;
    }

    return api<APIResponse>('GET', URI).then((result) => {
      return result.data.data.results;
    });
  }

  const loader = <HeroCardShimmer key={'loader'} />;

  const items = characters.map((character) => (
    <HeroCard
      key={character.id}
      id={character.id}
      name={character.name}
      thumbnail={character.thumbnail.path + '.' + character.thumbnail.extension}
    />
  ));

  return (
    <div>
      <SearchBar setSearchTerm={handleSearch} />
      <InfiniteScroll
        key={'infinitescroll'}
        pageStart={20}
        loadMore={updateCharacters}
        hasMore={characters.length < charactersLimit}
        loader={loader}
      >
        <div className="container">{items}</div>
      </InfiniteScroll>
    </div>
  );
};

export default Main;
