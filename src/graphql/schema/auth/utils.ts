import jwt from "jsonwebtoken";

type TCreateToken = { [p: string]: string | number | boolean; };

export const createToken = (props: TCreateToken) => {
  const maxAge = 1 * 24 * 60 * 60;
  return jwt.sign(props, process.env.JWT_SECRET as string, {
    expiresIn: maxAge,
  });
};