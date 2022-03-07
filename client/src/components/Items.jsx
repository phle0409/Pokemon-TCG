import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Items({ items }) {
  const getItemColor = (name) => {
    switch (name) {
      case "PlusPower":
        return "red";
      case "Defender":
        return "blue";
      default:
        return "black";
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
      {" "}
      {items && items.length > 0
        ? items.map((item, index) => {
            if (item.supertype !== "Trainer") return;
            return (
              <OverlayTrigger
                key={`${item}-${index}`}
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip>{item.name}</Tooltip>}
              >
                <div
                  className="m-1 item"
                  height="16rem"
                  width="16rem"
                  style={{
                    color: getItemColor(item.name),
                  }}
                >
                  &#43;
                </div>
              </OverlayTrigger>
            );
          })
        : ""}
    </div>
  );
}
