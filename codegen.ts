import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["https://backboard.railway.com/graphql/v2"],
  documents: ["src/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/lib/railway-client/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
