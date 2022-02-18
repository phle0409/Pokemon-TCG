import React from "react";

export default function EnergyCost({ energies }) {
  return (
    <div>
      {" "}
      {energies
        ? energies.map((energy, index) => {
            return <img src={require(`../images/${energy}.png`)} key={index} className="m-1" height="20rem" width="20rem" />;
          })
        : ""}
    </div>
  );
}
