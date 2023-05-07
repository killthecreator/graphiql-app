import React from "react";

const DocExamples = () => {
  return (
    <div
      className={"py-10"}
      style={{
        position: "relative",
        height: "900px",
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://graphql-pokemon.js.org/introduction/javascript-examples"
        scrolling="yes"
        style={{
          height: "900px",
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

export default DocExamples;
