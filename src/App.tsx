import React from 'react';
import HeroCard from './components/HeroCard';

const App: React.FC = () => {
  return (
    <>
      <h1> Marvel </h1>
      <HeroCard
        name="Hero"
        thumbnail="http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg"
      />
    </>
  );
};

export default App;
