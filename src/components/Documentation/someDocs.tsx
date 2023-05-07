import React from "react";

type DocGetPropType = {
  url: string;
}

const DocGet = (props: DocGetPropType) => {
  const link = "https://graphql-pokemon.js.org/" + props.url;
  return (
    <div className={"py-10"}>
      <iframe
        src={link}
        // id="main-content"
        scrolling="no"
        style={{ height: "900px", width: "100%" }}
      >
        Ваш браузер не поддерживает iframe!
      </iframe>
    </div>
  );
};

export default DocGet;
