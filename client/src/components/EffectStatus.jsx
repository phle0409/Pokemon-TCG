import React from "react";
import { Container } from "react-bootstrap";

const EffectStatus = ({ status }) => {
  let result = [];
  if (status.poisoned) result.push("PO");
  if (status.asleep) result.push("AS");
  if (status.confused) result.push("CO");
  if (status.paralyzed) result.push("PA");
  if (status.immortal) result.push("IM");
  let totalEffect = "";
  result.forEach((effect) => (totalEffect += effect + " "));
  return (
    <div>
      {(status.poisoned ||
        status.asleep ||
        status.confused ||
        status.paralyzed ||
        status.immortal) && (
        <p className="text-danger h7 ps-1">{totalEffect} </p>
      )}
    </div>
  );
};

export default EffectStatus;
