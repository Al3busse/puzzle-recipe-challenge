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
      await authUser(context.tokenBearer);
      let categories = await Category.find({ relations: ["recipes"] });
      if (categories.length != 0) {
        return categories;
      }
      throw new UserInputError("There are no Categories yet.");
    },

    getOneCategory: async (
      _: null,
      { categoryId }: { categoryId: number }
    ): Promise<Category> => {
      let category = await getConnection()
        .getRepository(Category)
        .findOne(categoryId, { relations: ["recipes"] });
      if (category) {
        return category;
      }
      throw new UserInputError("There is no Category with this ID");
    },
  },

  Mutation: {
    createCategory: async (
      _: null,
      { name }: { name: string }
    ): Promise<Category> => {
      let category = await getConnection()
        .getRepository(Category)
        .findOne({ where: { name } });
      if (category) {
        throw new UserInputError("There is a Category with that name already.");
      }
      let newCategory = new Category();
      newCategory.name = name;
      return getManager().save(newCategory);
    },

    updateCategory: async (
      _: null,
      { categoryId, input }: { categoryId: number; input: { name: string } }
    ): Promise<Category> => {
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
    },

    deleteCategory: async (
      _: null,
      { categoryId }: { categoryId: number }
    ): Promise<Boolean> => {
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
    },
  },
};
