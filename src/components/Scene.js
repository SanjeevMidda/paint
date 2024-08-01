import React from "react";
import useWindow from "./useWindow";
import { useRef, useEffect } from "react";

const Scene = () => {
  const { dimension } = useWindow();
  const canvas = useRef();

  const prevPosition = useRef(null);

  useEffect(() => {
    if (dimension.width > 0) init();
  }, [dimension]);

  const init = () => {
    const ctx = canvas.current.getContext("2d");
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, dimension.width, dimension.height);
    ctx.globalCompositeOperation = "destination-out";
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const manageMouseMove = (e) => {
    const { clientX, clientY, movementY, movementX } = e;

    const noOfCircles = Math.max(Math.abs(movementX), Math.abs(movementY));

    if (prevPosition.current != null) {
      const { x, y } = prevPosition.current;
      for (let index = 0; index < noOfCircles; index++) {
        const targetX = lerp(x, clientX, (1 / noOfCircles) * index);
        const targetY = lerp(y, clientY, (1 / noOfCircles) * index);

        draw(targetX, targetY, 50);
      }
    }

    prevPosition.current = {
      x: clientX,
      y: clientY,
    };
  };

  const draw = (x, y, radius) => {
    const ctx = canvas.current.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  };
  return (
    <div className="scene">
      <canvas
        height={dimension.height}
        width={dimension.width}
        ref={canvas}
        onMouseMove={manageMouseMove}
      ></canvas>

      <h2>wipe page gugu 👉</h2>
    </div>
  );
};

export default Scene;
