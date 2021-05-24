import React from 'react';

interface Props {
  name: string;
  thumbnail: string;
}

const HeroCard: React.FC<Props> = (props: Props) => {
  return (
    <div className="container">
      <img className="hero-thumbnail" src={props.thumbnail}></img>
      <h2 className="hero-name">{props.name}</h2>
    </div>
  );
};

export default HeroCard;
