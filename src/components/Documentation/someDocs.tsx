import React from "react";

type DocGetPropType = {
  url: string;
};

const DocGet = (props: DocGetPropType) => {
  const link = "https://graphql-pokemon.js.org/" + props.url;
  return (
    <div className="relative h-[900px] overflow-hidden py-10">
      <iframe src={link} className="absolute -top-12 h-full w-full">
        Ваш браузер не поддерживает iframe!
      </iframe>
    </div>
  );
};

export default DocGet;
