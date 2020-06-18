import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';

test('renders Dockerian JsUi by React.js', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Dockerian JsUi by React\.js/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
