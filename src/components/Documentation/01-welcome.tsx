import React from "react";

const DocWelcome = () => {
  return (
    <div className="relative h-[400px] overflow-hidden py-10">
      <iframe
        src="https://graphql-pokemon.js.org/introduction/welcome"
        className="absolute -top-12 h-full w-full"
      >
        Ваш браузер не поддерживает iframe!
      </iframe>
    </div>
  );
};

export default DocWelcome;
