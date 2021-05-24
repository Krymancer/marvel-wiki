import React from 'react';

import './index.css';

interface Props {
  name: string;
  thumbnail: string;
}

const HeroCard: React.FC<Props> = (props: Props) => {
  return (
    <div className="hero-container">
      <img className="hero-thumbnail" src={props.thumbnail}></img>
      <span className="hero-name">{props.name}</span>
    </div>
  );
};

export default HeroCard;
