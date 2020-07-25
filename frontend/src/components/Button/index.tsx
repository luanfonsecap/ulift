import React from 'react';
import Ripples from 'react-ripples';

import { Container } from './styles';

interface ButtonProps {
  outlined?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  outlined = false,
  type = 'button',
  onClick,
}) => {
  return (
    <Ripples>
      <Container onClick={onClick} outlined={outlined} type={type}>
        {children}
      </Container>
    </Ripples>
  );
};

export default Button;
