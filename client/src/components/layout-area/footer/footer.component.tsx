import React from "react";
import "./footer.style.css";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <div className="Footer">
      <h5>Henry Ben Yakov All rights reserved {year} ©</h5>
    </div>
  );
};
