import React from "react";

const DocGetAbility = () => {
  return (
    <div className={"py-10"}>
      <iframe
        src="https://graphql-pokemon.js.org/queries/getAbility"
        // id="main-content"
        scrolling="no"
        style={{ height: "900px", width: "100%" }}
      >
        Ваш браузер не поддерживает iframe!
      </iframe>
    </div>
  );
};

export default DocGetAbility;
