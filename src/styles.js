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
  font-family: 'Google Sans',Roboto,Arial,sans-serif;
  display: grid;
  height: 100vh;
`;

export { AppContainer };
