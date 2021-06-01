import React from 'react';
import { useHistory } from 'react-router-dom';

import { Character } from '../../api/interfaces';

import './index.css';

interface Props {
  character: Character;
}

const HeroCard: React.FC<Props> = (props: Props) => {
  const history = useHistory();

  const thumbnailPath =
    props.character.thumbnail?.path +
    '.' +
    props.character.thumbnail?.extension;

  /**
   * Fecth the characters from API
   * @param {string} id the id of the selected character
   */
  function handleHeroCardClick(id?: number): void {
    if (id) {
      const idStr = id.toString();
      history.push(`/details/${idStr}`);
    } else {
      console.log(
        `The id ${id} is not valid, not redirecting to details page!`,
      );
    }
  }

  return (
    <div
      onClick={() => handleHeroCardClick(props.character?.id)}
      className="hero-container"
    >
      <img
        className="hero-thumbnail"
        src={thumbnailPath}
        alt={props.character.name}
      ></img>
      <span className="hero-name">{props.character?.name}</span>
    </div>
  );
};

export default HeroCard;
