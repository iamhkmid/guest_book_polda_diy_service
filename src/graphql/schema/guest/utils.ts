import { Prisma } from "@prisma/client";

export const stringPath = (str: string) =>
  str.replace(/([^a-z0-9 ]+)/gi, " ").replace(/\s+/g, " ").replace(/ /g, "-").toLowerCase();

type TSortBookBy = (p: string) => Prisma.Enumerable<Prisma.BookOrderByWithRelationInput> | undefined
export const sortBookBy: TSortBookBy = (sortBy) => {
  switch (sortBy) {
    case "NEW": return { createdAt: "desc" }
    default: return undefined
  }
}