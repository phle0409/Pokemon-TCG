import React from "react";
import { Container } from "react-bootstrap";

const EffectStatus = ({ status }) => {
  let result = [];
  if (status.poisoned) result.push("poisoned");
  if (status.asleep) result.push("asleep");
  if (status.confused) result.push("confused");
  if (status.paralyzed) result.push("paralyzed");
  if (status.immortal) result.push("immortal");
  let totalEffect = "";
  result.forEach((effect) => (totalEffect += effect + " "));
  return (
    <div className="text-center">
      {(status.poisoned ||
        status.asleep ||
        status.confused ||
        status.paralyzed ||
        status.immortal) && <p className="text-danger">{totalEffect} </p>}
    </div>
  );
};

export default EffectStatus;
