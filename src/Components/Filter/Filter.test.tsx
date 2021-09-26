import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Filter />, div);
  ReactDOM.unmountComponentAtNode(div);
});