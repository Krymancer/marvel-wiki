import React from 'react';
import { useHistory } from 'react-router-dom';

import './index.css';

interface Props {
  name?: string;
  thumbnail?: string;
  description?: string;
}

const HeroDetails: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  /**
   * Handle back action
   */
  function handleBack(): void {
    history.push('/');
  }

  return (
    <div className="hero-details-container">
      <div className="hero-details-header">
        <a onClick={handleBack}>◀</a>
        <span>{props.name}</span>
      </div>
      <div className="hero-details-content">
        <img className="hero-details-thumbnail" src={props.thumbnail}></img>
        <div className="hero-details-info">
          <span className="hero-details-name">{props.name}</span>
          <p className="hero-details-description">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroDetails;
