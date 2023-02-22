import { MutationResolvers, QueryResolvers } from "../../../types/graphql";

export const Query: QueryResolvers = {
  guests: async (_, __, { db }) => {
    return await db.guest.findMany()
  },
  guest: async (_, { guestId }, { db }) => {
    return await db.guest.findUnique({ where: { id: guestId } })
  },
  summary: async (_, __, { db }) => {
    const datenow = new Date(new Date().setHours(0, 0, 0, 0))
    const oneYear = await db.guest.findMany(({
      where: { createdAt: { gte: datenow, lt: new Date(datenow.getTime() - new Date(datenow.setFullYear(datenow.getFullYear() + 1)).getTime()) } },
      select: { createdAt: true }
    }))
    const day = oneYear.filter((trans) => trans.createdAt.getDate() >= datenow.getDate() && trans.createdAt.getDate() < new Date(datenow.setDate(datenow.getDate() + 1)).getTime()).length
    const week = oneYear.filter((trans) => trans.createdAt.getDate() >= datenow.getDate() && trans.createdAt.getDate() < new Date(datenow.setDate(datenow.getDate() + 7)).getTime()).length
    const month = oneYear.filter((trans) => trans.createdAt.getDate() >= datenow.getDate() && trans.createdAt.getDate() < new Date(datenow.setMonth(datenow.getMonth() + 1)).getTime()).length
    const year = oneYear.length;
    return { numberOfVisits: { day, week, month, year } }
  },
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