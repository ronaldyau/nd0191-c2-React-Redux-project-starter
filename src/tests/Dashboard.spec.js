/* eslint-disable testing-library/render-result-naming-convention */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

describe('Dashboard', () => {
  it('should match snapshot', () => {
    const component = render(
      <React.StrictMode>
        <Provider store={store}>
          <MemoryRouter>
            <Dashboard />
          </MemoryRouter>
        </Provider>
      </React.StrictMode>
    );
    expect(component).toMatchSnapshot();
  });
});