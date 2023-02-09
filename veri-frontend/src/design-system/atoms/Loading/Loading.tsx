import styled from '@emotion/styled';

const StyledLoading = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid var(--chakra-colors-purple-200);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--chakra-colors-purple-200) transparent transparent
      transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  justify-content: center;
`;

export const Loading = () => {
  return (
    <CenterContainer>
      <StyledLoading>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StyledLoading>
    </CenterContainer>
  );
};
