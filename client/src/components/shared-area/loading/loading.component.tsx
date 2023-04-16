import React from "react";
import loadingImage from "../../../assets/images/loading.gif";
import "./loading.style.css";

export const Loading: React.FC = () => {
  return (
    <div className="Loading">
      <img src={loadingImage} alt="Loading..." />
    </div>
  );
};
