import React from 'react';

import './index.css';

const HeroCardShimmer: React.FC = () => {
  return (
    <div className="hero-shimmer-container">
      <div className="hero-shimmer-thumbnail"></div>
      <div className="hero-shimmer-name"></div>
    </div>
  );
};

export default HeroCardShimmer;
