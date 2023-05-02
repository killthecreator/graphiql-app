import React from "react";

const DocExamples = () => {
  return (
    <div className={"py-10"}>
      <iframe
        src="https://graphql-pokemon.js.org/introduction/javascript-examples"
        scrolling="yes"
        style={{
          height: "900px",
          width: "100%",
          position: "relative",
          top: "-50px",
          //   transform: "translateY('-100px')",
        }}
      >
        Ваш браузер не поддерживает iframe!
      </iframe>{" "}
    </div>
  );
};

export default DocExamples;
