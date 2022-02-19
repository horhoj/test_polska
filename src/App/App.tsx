import React from 'react';
import { NavLink } from 'react-router-dom';
import { getRoutePath, Router } from '../router';
import { Spinner } from './Spinner';

export const App: React.FC = () => {
  return (
    <>
      <Spinner />
      <div className="container">
        <header>
          <nav className="navbar justify-content-center">
            <ul className="navbar navbar-nav flex-row gap-2">
              <li>
                <NavLink to={getRoutePath('CategoryListPage')}>
                  Category List
                </NavLink>
              </li>
              <li>
                <NavLink to={getRoutePath('ProductListPage')}>
                  Product List
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Router />
        </main>
      </div>
    </>
  );
};
