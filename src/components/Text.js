import React from "react";
import video from "../assets/video.mp4";

const Text = () => {
  return (
    <div className="text">
      <video loop autoplay="true">
        <source src={video} type="video/mp4" />
      </video>
      <h1>GUJI MUJJIIIIIII 😆</h1>
    </div>
  );
};

export default Text;
