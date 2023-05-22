export type SchemaType = {
  __schema: {
    queryType: {
      name: string;
    };
    mutationType: null;
    subscriptionType: null;
    types: {
      description: string;
      enumValues: {
        deprecationReason: null;
        description: null;
        isDeprecated: boolean;
        name: string;
      }[];
      fields:
        | {
            args: [];
            deprecationReason: string | null;
            description: string;
            isDeprecated: boolean;
            name: string;
            type: {
              kind: string;
              name: string | null;
              ofType: object;
            };
          }[]
        | null;
      inputFields: null;
      interfaces: null;
      kind: string;
      name: string;
      possibleTypes: null;
    }[];
    directives: {
      args: {
        defaultValue: null;
        description: string;
        name: string;
        type: {
          name: string;
          kind: string;
          ofType: {
            kind: string;
            name: string;
            ofType: null;
          };
        };
      }[];
      description: string;
      locations: string[];
      name: string;
    }[];
  };
};
