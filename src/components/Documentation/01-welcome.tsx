import React from "react";

const DocWelcome = () => {
  return (
    <div
      className={"py-10"}
      style={{
        position: "relative",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://graphql-pokemon.js.org/introduction/welcome"
        scrolling="no"
        style={{
          height: "400px",
          width: "100%",
          position: "absolute",
          top: "-48px",
        }}
      >
        Ваш браузер не поддерживает iframe!
      </iframe>{" "}
    </div>
  );
};

export default DocWelcome;
