import styled, { css } from 'styled-components';

interface ContainerProps {
  hasError?: boolean;
  hasSuccess?: boolean;
}

export const Wrapper = styled.div`
  margin: 4px 0;
`;

export const Container = styled.div<ContainerProps>`
  border-radius: 8px;
  border: 1px solid #a4b0be;
  padding: 8px 16px;

  input {
    border: 0;
    background-color: #fff;
    font-size: 16px;
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: #ff4757;
    `}

  ${({ hasSuccess }) =>
    hasSuccess &&
    css`
      border-color: #2ed573;
    `}
`;

export const ErrorMessage = styled.div`
  margin-left: 16px;
  color: #ff4757;
  font-size: 14px;
`;
