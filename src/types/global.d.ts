export const thisIsAModule = true; // <-- definitely in a module

declare global {
    var prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;
}