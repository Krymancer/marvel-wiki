import React from 'react';
import { useHistory } from 'react-router-dom';

import './index.css';

interface Props {
  id: string;
  name: string;
  thumbnail: string;
}

const HeroCard: React.FC<Props> = (props: Props) => {
  const history = useHistory();

  /**
   * Fecth the characters from API
   * @param {string} id the id of the selected character
   */
  function handleHeroCardClick(id: string): void {
    history.push(`/details/${id}`);
  }

  return (
    <div
      onClick={() => handleHeroCardClick(props.id)}
      className="hero-container"
    >
      <img
        className="hero-thumbnail"
        src={props.thumbnail}
        alt={props.name}
      ></img>
      <span className="hero-name">{props.name}</span>
    </div>
  );
};

export default HeroCard;
