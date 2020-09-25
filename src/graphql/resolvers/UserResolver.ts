import { getConnection, getManager } from "typeorm";
import { UserInputError } from "apollo-server-express";
import { loginSchema, registrationSchema } from "../../utils/validation";
import { getToken, hashPassword, validatePassword } from "../../utils/auth";
import { User } from "../../entity/User";

export default {
  Query: {},

  Mutation: {
    signUp: async (
      _: null,
      {
        input,
      }: {
        input: {
          name: string;
          email: string;
          password: string;
        };
      }
    ): Promise<User> => {
      const { error } = registrationSchema.validate(input);
      if (error) throw new UserInputError(error.details[0].message);

      const userExist = await getConnection()
        .getRepository(User)
        .findOne({
          where: { email: input.email },
        });

      if (userExist) throw new UserInputError("Email is already in use.");

      const newUser = new User();

      newUser.name = input.name;
      newUser.email = input.email;
      newUser.password = await hashPassword(input.password);

      const savedUser = await getManager().save(newUser);
      return savedUser as User;
    },

    logIn: async (
      _: null,

      {
        input,
      }: {
        input: {
          email: string;
          password: string;
        };
      }
    ) => {
      const { error } = loginSchema.validate(input);
      if (error) throw new UserInputError(error.details[0].message);

      const userExist = await getConnection()
        .getRepository(User)
        .findOne({
          where: { email: input.email },
        });

      if (!userExist) throw new UserInputError("Wrong email or password.");

      const validPassword = await validatePassword(
        input.password,
        userExist.password
      );

      if (!validPassword) throw new UserInputError("Wrong email or password.");

      const token = getToken(userExist.id);

      return { token };
    },
  },
};
