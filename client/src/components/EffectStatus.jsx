import React from 'react';
import { Container } from 'react-bootstrap';

const EffectStatus = ({ status }) => {
  return (
    <div className="text-center">
      {status.poisoned && <p className="text-danger">poisoned </p>}
      {status.asleep && <p className="text-danger">asleep </p>}
      {status.confused && <p className="text-danger">confused </p>}
      {status.paralyzed && <p className="text-danger">paralyzed </p>}
      {status.immortal && <p className="text-danger">immortal </p>}
    </div>
  );
};

export default EffectStatus;
