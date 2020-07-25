import styled from 'styled-components';

export const Container = styled.section`
  max-width: 650px;
  height: 100%;
  margin: auto;
  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    max-width: 400px;
    min-width: 250px;
    border-radius: 50%;
  }

  h1 {
    font-size: 38px;
    margin-top: 8px;
  }

  h2 {
    margin-top: 16px;
    font-size: 24px;
    font-style: italic;
    text-align: center;
    opacity: 0.8;
  }

  @media (max-width: 430px) {
    img {
      max-width: 300px;
    }

    h2 {
      font-size: 16px;
    }
  }
`;

export const ButtonGroup = styled.div`
  margin-top: 38px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  @media (max-width: 360px) {
    flex-direction: column;

    button {
      margin-top: 8px;
    }
  }
`;

export const Divider = styled.div`
  height: 40px;
  width: 1px;
  background: #2f3542;
  opacity: 0.4;

  @media (max-width: 430px) {
    display: none;
  }
`;
