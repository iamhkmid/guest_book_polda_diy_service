
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3001/graphql",
  generates: {
    "src/types/graphql.d.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./graphql_ctx#TGraphqlCtx"
      }
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
