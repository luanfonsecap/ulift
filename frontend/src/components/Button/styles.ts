import styled, { css } from 'styled-components';

interface ContainerProps {
  outlined: boolean;
}

export const Container = styled.button<ContainerProps>`
  border: 0;
  padding: 10px 25px;
  border-radius: 4px;
  background-color: #6256ef;
  min-width: 150px;

  text-transform: uppercase;
  color: #fff;

  &:hover {
    opacity: 0.9;
  }

  ${({ outlined }) =>
    outlined &&
    css`
      background-color: transparent;
      border: 1px solid #6256ef;
      color: #6256ef;

      &:hover {
        opacity: 0.8;
      }
    `}
`;
