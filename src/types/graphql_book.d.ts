import { TGraphqlCtx } from "./graphql_ctx";

type TGqlBook = {
  id: string;
  title: string;
  authorName: string;
  price: number,
  numberOfPages: number,
  stock: number;
  publisher: string;
  description: string | null;
  Image: { url: string; secureUrl: string; } | null
  printType: string;
  isbn: string;
  slug: string;
}

export type TBookQuery = {
  books: (
    parent: any,
    args: undefined,
    context: TGraphqlCtx
  ) => Promise<TGqlBook[]>;
};