/* eslint-disable testing-library/render-result-naming-convention */
import NavBar from '../components/NavBar';
import * as React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar', () => {
  it('should match snapshot', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});