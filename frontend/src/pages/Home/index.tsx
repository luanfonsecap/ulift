import React from 'react';

import Button from '../../components/Button';
import logoImg from '../../assets/car_ride.svg';

import { Container, ButtonGroup, Divider } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <img src={logoImg} alt="Logo" />

      <h1>uLift</h1>
      <h2>Seu aplicativo para encontrar caronas universitarias</h2>

      <ButtonGroup>
        <Button>Entrar</Button>

        <Divider />

        <Button outlined>Cadastrar</Button>
      </ButtonGroup>
    </Container>
  );
};

export default Home;
