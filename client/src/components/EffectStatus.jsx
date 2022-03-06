import React from 'react';
import { Container } from 'react-bootstrap';

const EffectStatus = ({ status }) => {
  const [skillStatus, setSkillStatus] = React.useState('');

  console.log(status);

  return (
    <Container className="center">
      <p className="text-danger text-center">effect</p>
    </Container>
  );
};

export default EffectStatus;
