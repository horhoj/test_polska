import React from 'react';
import { NavLink } from 'react-router-dom';
import { getRoutePath, Router } from '../router';
import { Spinner } from './Spinner';

export const App: React.FC = () => {
  return (
    <>
      <Spinner />
      <div className="container">
        <nav className="navbar d-flex">
          <NavLink to={getRoutePath('CategoryListForm')}>Category List</NavLink>
        </nav>
        <main>
          <Router />
        </main>
      </div>
    </>
  );
};
