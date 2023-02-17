import { MutationResolvers, QueryResolvers } from "../../../types/graphql";

export const Query: QueryResolvers = {
  guests: async (_, __, { db }) => {
    return await db.guest.findMany()
  },
  guest: async (_, { guestId }, { db }) => {
    return await db.guest.findUnique({ where: { id: guestId } })
  }
};

export const Mutation: MutationResolvers = {
  addGuest: async (_, { data }, { db }) => {
    const addGuest = await db.guest.create({
      data: {
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        description: data.address
      },
    })
    return addGuest
  },
  updateGuest: async (_, { data }, { db }) => {
    const updateBook = await db.guest.update({
      where: { id: data.guestId },
      data: {
        name: data.name || undefined,
        address: data.address || undefined,
        phoneNumber: data.phoneNumber || undefined,
        description: data.address || undefined
      },
    })
    return updateBook
  },
  deleteGuest: async (_, { guestId }, { db }) => {
    return await db.guest.delete({ where: { id: guestId } })
  },
}