import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  
  &.nav-logo {
    flex-direction: row;
    margin-bottom: 0;
    margin-right: 12px;
  }
`;

const LogoImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  
  &.extra-small {
    width: 100px;
    height: 100px;
    margin-bottom: 0;
  }
  
  &.small {
    width: 200px;
  }
  
  &.medium {
    width: 300px;
  }
  
  &.large {
    width: 280px;
  }
`;

const Logo = ({ size = 'medium', nav = false }) => {
  return (
    <LogoContainer className={nav ? 'nav-logo' : ''}>
      <LogoImage
        src={`${process.env.PUBLIC_URL}/assets/TokenBookLogoNoBG.png`}
        alt="Interactive Tokenomics Ebook Logo"
        className={size}
      />
    </LogoContainer>
  );
};

export default Logo;