import { MutationResolvers, QueryResolvers } from "../../../types/graphql";

export const Query: QueryResolvers = {
  guests: async (_, __, { db }) => {
    return await db.guest.findMany()
  },
  guest: async (_, { guestId }, { db }) => {
    return await db.guest.findUnique({ where: { id: guestId } })
  },
  summary: async (_, __, { db }) => {
    const startYear = new Date(`${new Date().getFullYear()}-01-01T00:00:00.000+07:00`)
    const endYear = new Date(new Date(startYear).setFullYear(new Date(startYear).getFullYear() + 1))

    const currMonth = new Date(new Date().setHours(new Date().getHours() - 7)).getMonth() + 1
    const startMonth = new Date(`${new Date().getFullYear()}-${currMonth < 10 ? `0${currMonth}` : currMonth}-01T00:00:00.000+07:00`)
    const endMonth = new Date(new Date(startMonth).setMonth(new Date().getMonth() + 1))

    const currDate = new Date(new Date().setHours(new Date().getHours() - 7))
    const currWeek = new Date(new Date(currDate).setDate(new Date(currDate).getDate() - new Date(currDate).getDay()))
    const startWeek = new Date(`${new Date(currDate).getFullYear()}-${currMonth < 10 ? `0${currMonth}` : currMonth}-${currWeek.getDate() < 10 ? `0${currWeek.getDate()}` : currWeek.getDate()}T00:00:00.000+07:00`)
    const endWeek = new Date(new Date(startWeek).setDate(new Date(startWeek).getDate() + 7))

    const startDate = new Date(`${new Date(currDate).getFullYear()}-${currMonth < 10 ? `0${currMonth}` : currMonth}-${currDate.getDate() < 10 ? `0${currDate.getDate()}` : currDate.getDate()}T00:00:00.000+07:00`)
    const endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 1))

    const oneYear = await db.guest.findMany(({
      where: { createdAt: { gte: startYear, lt: endYear } },
      select: { createdAt: true }
    }))

    const day = oneYear.filter((trans) => trans.createdAt.getTime() >= new Date(startDate).getTime() && trans.createdAt.getTime() < new Date(endDate).getTime()).length
    const week = oneYear.filter((trans) => trans.createdAt.getTime() >= new Date(startWeek).getTime() && trans.createdAt.getTime() < new Date(endWeek).getTime()).length
    const month = oneYear.filter((trans) => trans.createdAt.getTime() >= new Date(startMonth).getTime() && trans.createdAt.getTime() < new Date(endMonth).getTime()).length
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
        description: data.description
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
        description: data.description || undefined
      },
    })
    return updateBook
  },
  deleteGuest: async (_, { guestId }, { db }) => {
    return await db.guest.delete({ where: { id: guestId } })
  },
}