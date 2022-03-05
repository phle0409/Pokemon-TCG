import React from "react";

export default function EnergyCost({ energies }) {
  return (
    <div className="mx-1 d-flex flex-row flex-wrap justify-content-center align-items-center">
      {" "}
      {energies?.length > 0
        ? energies.map((energy, index) => {
            return (
              <img
                src={require(`../images/${energy}.png`)}
                key={index}
                className="m-1 energy"
                height="16rem"
                width="16rem"
              />
            );
          })
        : ""}
    </div>
  );
}
