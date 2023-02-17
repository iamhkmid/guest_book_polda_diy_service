import { makeExecutableSchema } from '@graphql-tools/schema'
import AuthDirectiveTransformer from "./directives/AuthDirectiveTransformer";
import _ from "lodash";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from 'path';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesDefArray = loadFilesSync(path.join(process.cwd(), 'src/graphql/schema/**/*.graphql'), { recursive: true })
const typeDefs = mergeTypeDefs(typesDefArray)

const isDev = process.env.NODE_ENV === "development"
const resolverArray = loadFilesSync(path.join(__dirname, `./**/*.resolvers.${isDev ? "ts" : "js"}`), { recursive: true })
const resolvers = _.merge(resolverArray);

let schema = makeExecutableSchema({ typeDefs, resolvers });

const directiveTransformers = [
  { transformer: AuthDirectiveTransformer, name: "auth" }
]

schema = directiveTransformers.reduce((acc, curr) => curr.transformer(acc, curr.name), schema)

export default schema;