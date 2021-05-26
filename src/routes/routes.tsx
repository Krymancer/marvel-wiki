import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Details from '../pages/Details';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Main} />
      <Route path="/details/:id" exact component={Details} />
    </BrowserRouter>
  );
};

export default AppRouter;
