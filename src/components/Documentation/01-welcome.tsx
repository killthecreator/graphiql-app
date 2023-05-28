import React from "react";
import { useTranslation } from "next-i18next";

const DocWelcome = () => {
  const { t } = useTranslation("common");
  return (
    <div className="relative h-[400px] overflow-hidden py-10 dark:invert-[0.882]">
      <iframe
        src="https://graphql-pokemon.js.org/introduction/welcome"
        className="absolute -top-12 h-full w-full"
      >
        {t(iframe)}
      </iframe>
    </div>
  );
};

export default DocWelcome;
