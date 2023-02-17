import { GraphQLError } from "graphql";
import express from "express";
import jwt from "jsonwebtoken";

type TCheckRole = (p: { requires: string; role: string }) => void;

export const checkRole: TCheckRole = ({ requires, role }) => {
  if (requires !== role) throw new GraphQLError('Authentication is required', { extensions: { code: 'FORBIDDEN' } })
};

type TAuthD = (p: { req: express.Request; requires: string; }) => Promise<{ user: any }>;

type TDecoded = { username: string; role: string; }

const authDirective: TAuthD = async (props) => {
  const { req, requires } = props;

  const authHeader = req.headers["authorization"];
  const token = (authHeader?.includes("bearer") || authHeader?.includes("Bearer")) ? authHeader?.split(" ")[1] : authHeader;
  if (!!token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (!!decoded) {
        checkRole({ requires, role: (decoded as TDecoded)["role"] });
        return { user: decoded };
      } else {
        throw new GraphQLError('Authentication is required', { extensions: { code: 'FORBIDDEN' } })
      }
    } catch (error) {
      throw error;
    }
  } else {
    throw new GraphQLError('Authentication is required', { extensions: { code: "UNAUTHENTICATED" } })
  }
};

export default authDirective;
