import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import News from './NewsItem';

describe('<NewsItem />', () => {
  test('it should mount', () => {
    render(<News />);
    
    const news = screen.getByTestId('News');

    expect(news).toBeInTheDocument();
  });
});
