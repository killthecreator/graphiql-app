import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { getIntrospectionQuery } from "graphql";
import { mainUrl } from "~/rtk";

export const fetcher = createGraphiQLFetcher({
  url: mainUrl,
});

export const getSchema = async () =>
  fetcher({
    query: getIntrospectionQuery(),
    operationName: "IntrospectionQuery",
  });
