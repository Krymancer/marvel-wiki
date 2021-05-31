import React, { useState } from 'react';

import './index.css';

interface Props {
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: React.FC<Props> = (props: Props) => {
  const [term, setTerm] = useState('');

  return (
    <div className="search-container">
      <input
        placeholder="Digite o nome do Héroi pra pesquisar aqui"
        type="text"
        className="search-input"
        onChange={(e) => {
          setTerm(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            props.setSearchTerm(term);
          }
        }}
      ></input>
    </div>
  );
};

export default SearchBar;
