import React, { InputHTMLAttributes, ReactElement } from 'react';

import { Wrapper, Container, ErrorMessage } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  error,
  errorMessage,
  success,
  ...props
}) => {
  return (
    <Wrapper>
      <Container hasError={error} hasSuccess={success}>
        <input {...props} />
      </Container>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Wrapper>
  );
};

export default Input;
