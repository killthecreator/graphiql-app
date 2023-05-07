import { GraphQLSchema, buildSchema } from 'graphql';
import { typeDefs } from '~/graphql/typeDafs'

export const graphqlSchema = buildSchema(typeDefs);
