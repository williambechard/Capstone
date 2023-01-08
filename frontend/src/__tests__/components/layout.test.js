import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Layout from '../../../components/Layout/Layout';
import { debug } from 'jest-preview';

jest.mock('next/image', () => ({ src, alt, width, height }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    // eslint-disable-next-line
    <img src={src} alt={alt} style={{ width: width, height: height }} />
  );
});

describe('layout component tests', () => {
  it('should display the default banner', () => {
    render(<Layout>test</Layout>);
    const titleText = screen.getByText("William's Capstone");
    expect(titleText).toBeInTheDocument();
    expect(titleText).toHaveStyle(
      'fontSize:1.70',
      'fontWeight:1000',
      'margin:auto 10px'
    );
    debug();
    const div = screen.getByText('test');
    expect(div).toBeInTheDocument();
  });
  it('should display the default footer', () => {
    render(<Layout>test</Layout>);
    const footer = screen.getByText(
      '@ 2022 Omni Federal - All Rights Reserved'
    );

    expect(footer).toBeInTheDocument();

    expect(footer).toHaveStyle(
      'background-color:black',
      'color:white',
      'font-size:1em',
      'margin:auto 10px'
    );
  });
});
