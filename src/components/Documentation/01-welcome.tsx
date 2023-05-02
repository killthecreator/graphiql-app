import React from "react";

const DocWelcome = () => {
  return (
    <div className={"py-10"}>
      <div className="bx--col">
        {" "}
        <div className="parent svelte-1jlumb">
          <h1 id="welcome" className="header header-base svelte-1jlumb">
            Welcome
          </h1>{" "}
        </div>
        <p className="md-paragraph svelte-uzcm98">
          Welcome to the{" "}
          <code className="code-span svelte-1292o4f">graphql-pokemon</code>{" "}
          project!
        </p>
        <p className="md-paragraph svelte-uzcm98">
          This projects contains a GraphQL API for retrieving information about
          Pokémon. The API allows users to query for information about Pokémon,
          including their types, abilities, and moves. The data for the Pokémon
          is sourced from the popular video game series, provided by external
          sources such as
          <a href="https://www.smogon.com" className="bx--link">
            Smogon{" "}
          </a>
          ,{" "}
          <a href="https://serebii.net" className="bx--link">
            Serebii{" "}
          </a>
          , and
          <a href="https://bulbapedia.bulbagarden.net" className="bx--link">
            Bulbapedia{" "}
          </a>
          .
        </p>
        <p className="md-paragraph svelte-uzcm98">
          The easiest way to get to know this API is to try it out in the
          <a href="https://graphqlpokemon.favware.tech/v7" className="bx--link">
            playground{" "}
          </a>
          .
        </p>
        <p className="md-paragraph svelte-uzcm98">
          For implementing the API in your own code, choose your preferred
          language and method of making Web requests. Beyond that point you will
          need to learn the GraphQL syntax, and the documentation on this
          website as well as the queries provided by the{" "}
          <a href="https://graphqlpokemon.favware.tech/v7" className="bx--link">
            playground{" "}
          </a>{" "}
          will help you get started.
        </p>
      </div>
    </div>
  );
};

export default DocWelcome;
