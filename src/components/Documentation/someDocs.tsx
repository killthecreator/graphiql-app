import React from "react";
import { useTranslation } from "next-i18next";

type DocGetPropType = {
  url: string;
};

const DocGet = (props: DocGetPropType) => {
  const link = "https://graphql-pokemon.js.org/" + props.url;
  const { t } = useTranslation("common");
  return (
    <div className="relative h-[900px] overflow-hidden py-10">
      <iframe src={link} className="absolute -top-12 h-full w-full">
        {t("iframe")}
      </iframe>
    </div>
  );
};

export default DocGet;
