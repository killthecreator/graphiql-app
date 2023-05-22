import React from "react";

const DocExamples = () => {
  return (
    <div className="relative h-[900px] overflow-hidden py-10 dark:invert-[0.882]">
      <iframe
        src="https://graphql-pokemon.js.org/introduction/javascript-examples"
        className="absolute -top-12 h-full w-full"
      >
        Ваш браузер не поддерживает iframe!
      </iframe>
    </div>
  );
};

export default DocExamples;
