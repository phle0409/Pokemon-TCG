import React from "react";

export default function EnergyCost({ energies }) {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
      {" "}
      {energies && energies.length > 0
        ? energies.map((energy, index) => {
            return (
              <img
                src={require(`../images/${energy}.png`)}
                key={index}
                className="m-1 energy"
                height="20rem"
                width="20rem"
              />
            );
          })
        : ""}
    </div>
  );
}
