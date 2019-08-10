import styled from 'styled-components';

const size = {
  small: '320px',
  medium: '768px',
  large: '1024px'
};

const device = {
  small: `(min-width: ${size.small})`,
  medium: `(min-width: ${size.medium})`,
  large: `(min-width: ${size.large})`,
};

const GREY = '#E8E8E8';

const AppContainer = styled.div`
  display: grid;
  padding: 12px;;
  background: lime;
  height: 100vh;

  @media ${device.medium} {
    padding: 24px 60px;
    background: dodgerBlue;
  }

  @media ${device.large} {
    padding: 144px;
    background: deepskyblue;
  }
`;

export { AppContainer };
