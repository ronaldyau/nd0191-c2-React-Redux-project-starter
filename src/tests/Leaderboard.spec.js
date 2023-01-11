/* eslint-disable testing-library/render-result-naming-convention */
import Leaderboard from '../components/Leaderboard';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar', () => {
  it('should match snapshot', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Leaderboard />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});
