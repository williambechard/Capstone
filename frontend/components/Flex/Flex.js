import styled from '@emotion/styled';
import colors from '../../theme/colors';

/**
 * Style component based on a div element
 */
const StyledFlex = styled.div`
  display: flex;
  ${props => `
      z-index:${props.zIndex};
      transform:${props.transform};
      background-color:${props.bgColor};
      gap:${props.gap};
      flex-wrap: ${props.wrap};
      margin: ${props.margin};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      justify-content: ${props.justifyContent};
      align-content: ${props.alignContent};
      flex-direction: ${props.direction};
      border-radius:${props.borderRadius};
      position:${props.position};
      top:${props.top};
      left:${props.left};
      bottom:${props.bottom};
      @media screen and (max-width: 410px) {
        flex-direction: column;
      }
  `}
`;

const Flex = ({
  children,
  bgColor = colors.mono[0],
  gap = 'unset',
  wrap = 'wrap',
  margin = '0',
  width = '100%',
  height = '100%',
  padding = '0',
  justifyContent = 'center',
  alignContent = 'center',
  direction = 'initial',
  zIndex = '0',
  transform = 'inherit',
  borderRadius = '0',
  top = 'unset',
  bottom = 'unset',
  left = 'unset',
  position = 'unset'
}) => {
  return (
    <StyledFlex
      bgColor={bgColor}
      gap={gap}
      wrap={wrap}
      margin={margin}
      width={width}
      height={height}
      padding={padding}
      justifyContent={justifyContent}
      alignContent={alignContent}
      direction={direction}
      zIndex={zIndex}
      transform={transform}
      borderRadius={borderRadius}
      position={position}
      top={top}
      left={left}
      bottom={bottom}
    >
      {children}
    </StyledFlex>
  );
};

export default Flex;
