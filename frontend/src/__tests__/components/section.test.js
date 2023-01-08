import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Section from '../../../components/Section/Section';
import { colors } from '../../../components';

describe('Section Component Tests', () => {
  it('should render a default Section component', () => {
    render(<Section>section-1</Section>);
    const sectionComponent = screen.getByText('section-1');
    expect(sectionComponent).toBeInTheDocument();
    expect(sectionComponent).toHaveStyle(
      `background-color : white`,
      'templateRows :auto 1fr auto',
      'borderRadius : 0',
      'height :100vh',
      'margin :0',
      'width :auto'
    );
  });
  it('should render a Section component with specified unique style', () => {
    render(
      <Section
        bgColor={colors.mono[1]}
        templateRos={'1fr 1fr 1fr'}
        borderRadius={'10px'}
        margin={'10'}
        width={'50px'}
        height={'50px'}
      >
        section-1
      </Section>
    );
    const sectionComponent = screen.getByText('section-1');
    expect(sectionComponent).toBeInTheDocument();
    expect(sectionComponent).toHaveStyle(
      `background-color : #dfdfdf`,
      'templateRows :auto 1fr auto',
      'borderRadius : 10px',
      'height :50px',
      'margin :10',
      'width :50px'
    );
  });
});
