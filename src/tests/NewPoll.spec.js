/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/render-result-naming-convention */
import NewPoll from '../components/NewPoll';
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom'

describe('NewPoll', () => {
  it('should match snapshot', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <NewPoll />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });

  it('should add a new poll successfully', async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Provider store={store}>
            <NewPoll />
          </Provider>
        </MemoryRouter>
      ),
    );

    const optionOne = screen.getByTestId('option-one-input');
    const optionTwo = screen.getByTestId('option-two-input');
    const submitButton = screen.getByTestId('submit-button');

    await act(async () => {
      fireEvent.change(optionOne, { target: { value: 'first option' } });
      fireEvent.change(optionTwo, { target: { value: 'second option' } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByTestId('success-header')).toBeInTheDocument();
    expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
  });

  it('should not add a new poll due to not receiving second option', async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Provider store={store}>
            <NewPoll />
          </Provider>
        </MemoryRouter>
      ),
    );

    const optionOne = screen.getByTestId('option-one-input');
    const optionTwo = screen.getByTestId('option-two-input');
    const submitButton = screen.getByTestId('submit-button');

    await act(async () => {
      fireEvent.change(optionOne, { target: { value: 'first option' } });
      fireEvent.change(optionTwo, { target: { value: undefined } });
      fireEvent.click(submitButton);
    });

    expect(screen.getByTestId('error-header')).toBeInTheDocument();
    expect(screen.queryByTestId('success-header')).not.toBeInTheDocument();
  });
});