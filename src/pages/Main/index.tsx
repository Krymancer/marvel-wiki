import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroller';

import HeroCard from '../../components/HeroCard';
import HeroCardShimmer from '../../components/HeroCardShimmer';
import SearchBar from '../../components/SearchBar';

import api from '../../api';
import { publicKey } from '../../utils/apiConstants';
import { CharacterDataWrapper, Character } from '../../api/interfaces';

import './index.css';

const Main: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [total, setTotal] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    if (searchTerm != '') {
      searchCharacters();
    } else {
      setCharacters([]);
      updateCharacters();
    }

    return () => source.cancel();
    // eslint-disable-next-line
  }, [searchTerm]); // cant put the methods inside useEffect as a dependency because we use them in the infinite loader

  /**
   * Handle Search
   *
   * @param {string} term the term to search
   */
  function handleSearch(term: string): void {
    setSearchTerm(term);
  }

  /**
   * LoadChar
   */
  function searchCharacters(): void {
    const URI = 'characters';
    const params = {
      apikey: publicKey,
      limit: 20,
      nameStartsWith: searchTerm,
    };

    try {
      api<CharacterDataWrapper>('GET', URI, params).then((axiosResponse) => {
        const response = axiosResponse.data.data; // Extracting data from axios response

        setTotal(response?.total ?? 0);
        setCharacters(response?.results ?? []);
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
   * Update Char
   */
  function updateCharacters(): void {
    loadCharacters();
  }

  /**
   * LoadChar
   */
  function loadCharacters(): void {
    const URI = 'characters';
    const params = {
      apikey: publicKey,
      limit: 20,
      offset: characters.length,
    };
    try {
      api<CharacterDataWrapper>('GET', URI, params).then((axiosResponse) => {
        const response = axiosResponse.data.data; // Extracting data from axios response

        setTotal(response?.total ?? 0);
        setCharacters(characters.concat(response?.results ?? []));
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Marvel API request got cancelled');
      } else {
        throw error;
      }
    }
  }

  const loader = <HeroCardShimmer key={'loader'} />;

  const items = characters.map((character) => (
    <HeroCard key={character.id} character={character} />
  ));

  return (
    <div>
      <SearchBar setSearchTerm={handleSearch} />
      <InfiniteScroll
        key={'infinitescroll'}
        pageStart={20}
        loadMore={updateCharacters}
        hasMore={characters.length < total}
        loader={loader}
      >
        <div className="container">{items}</div>
      </InfiniteScroll>
    </div>
  );
};

export default Main;
