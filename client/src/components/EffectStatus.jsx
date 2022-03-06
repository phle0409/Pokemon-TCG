import React from 'react';
import { Container } from 'react-bootstrap';

const EffectStatus = ({ status }) => {
  const [skillStatus, setSkillStatus] = React.useState('');

  let result = '';
  if (status.poisoned) result += ' poisoned';
  if (status.asleep) result += ' asleep';
  if (status.confused) result += ' confused';
  if (status.paralyzed) result += ' paralyzed';
  if (status.immortal) result += ' immortal';

  return (
    <Container className="center">
      {result !== '' && <p className="text-danger">{skillStatus}</p>}
    </Container>
  );
};

export default EffectStatus;
