import { GraphQLError } from "graphql";
import { MutationResolvers } from "../../../types/graphql";
import bcrypt from "bcrypt"
import { createToken } from "./utils";
import { decryptRSA } from "../../../libs/rsa";

export const Mutation: MutationResolvers = {
  login: async (_, args, { db, res }) => {
    const { username, password } = args
    const decryptedPass = decryptRSA(password)
    const findUser = await db.user.findUnique({ where: { username } })
    if (!findUser) throw new GraphQLError('Username or Password incorrect', { extensions: { code: 'BAD_REQUEST' } })

    if (!findUser.isActive) throw new GraphQLError('Inactive account', { extensions: { code: 'FORBIDDEN' } })

    const checkPw = await bcrypt.compare(decryptedPass, findUser.password)
    if (!checkPw)
      throw new GraphQLError("Username or Password incorrect", { extensions: { code: 'FORBIDDEN' } })

    const token = createToken({
      id: findUser.id,
      fullName: findUser.fullName,
      username: findUser.username,
      role: findUser.role,
    });

    res.setHeader("Authorization", token)
    
    return { message: "Successfully logged in", user: findUser }
  }
}