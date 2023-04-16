import React from "react";

export const PageNotFound: React.FC = () => {
  return (
    <div className="PageNotFound">
      <p>The page you are looking for doesn't exist.</p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=true"
        allow="autoplay"
        title="Page not Found"
      ></iframe>
    </div>
  );
};