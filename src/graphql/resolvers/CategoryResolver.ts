import { getConnection, getManager } from "typeorm";
import { UserInputError } from "apollo-server-express";
import { Category } from "../../entity/Category";
import { authUser } from "../../utils/auth";

export default {
  Query: {
    getCategories: async (
      _: null,
      __: null,
      context: { tokenBearer: string }
    ): Promise<Category[]> => {
      try {
        await authUser(context.tokenBearer);
        let categories = await Category.find({ relations: ["recipes"] });
        if (categories.length != 0) {
          return categories;
        }
        throw new UserInputError("There are no Categories yet.");
      } catch (err) {
        return err;
      }
    },

    getOneCategory: async (
      _: null,
      { categoryId }: { categoryId: number },
      context: { tokenBearer: string }
    ): Promise<Category> => {
      try {
        await authUser(context.tokenBearer);
        let category = await getConnection()
          .getRepository(Category)
          .findOne(categoryId, { relations: ["recipes"] });
        if (category) {
          return category;
        }
        throw new UserInputError("There is no Category with this ID");
      } catch (err) {
        return err;
      }
    },
  },

  Mutation: {
    createCategory: async (
      _: null,
      { name }: { name: string },
      context: { tokenBearer: string }
    ): Promise<Category> => {
      try {
        await authUser(context.tokenBearer);
        let category = await getConnection()
          .getRepository(Category)
          .findOne({ where: { name } });
        if (category) {
          throw new UserInputError(
            "There is a Category with that name already."
          );
        }
        let newCategory = new Category();
        newCategory.name = name;
        return getManager().save(newCategory);
      } catch (err) {
        return err;
      }
    },

    updateCategory: async (
      _: null,
      { categoryId, input }: { categoryId: number; input: { name: string } },
      context: { tokenBearer: string }
    ): Promise<Category> => {
      try {
        await authUser(context.tokenBearer);
        let categoryToUpdate = await getConnection()
          .getRepository(Category)
          .findOne(categoryId, { relations: ["recipes"] });
        if (!categoryToUpdate) {
          throw new UserInputError("There is no Category with this ID");
        } else {
          categoryToUpdate.name = input.name;
          let updatedCategory = await getConnection()
            .getRepository(Category)
            .save(categoryToUpdate);
          return updatedCategory;
        }
      } catch (err) {
        return err;
      }
    },

    deleteCategory: async (
      _: null,
      { categoryId }: { categoryId: number },
      context: { tokenBearer: string }
    ): Promise<Boolean> => {
      try {
        await authUser(context.tokenBearer);
        let category = await getConnection()
          .getRepository(Category)
          .findOne(categoryId, { relations: ["recipes"] });
        if (!category) {
          throw new UserInputError("There is no Category with this ID");
        }
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Category)
          .where("id = :id", { id: categoryId })
          .execute();
        return true;
      } catch (err) {
        return err;
      }
    },
  },
};
