import { getConnection, getManager, getRepository } from "typeorm";
import { UserInputError } from "apollo-server-express";
import { Recipe } from "../../entity/Recipe";
import { Category } from "../../entity/Category";
import { User } from "../../entity/User";
import { authUser, decodeToken } from "../../utils/auth";

export default {
  Query: {
    getRecipes: async (
      _: null,
      __: null,
      context: { tokenBearer: string }
    ): Promise<Recipe[]> => {
      await authUser(context.tokenBearer);
      let recipes = await Recipe.find({ relations: ["category", "user"] });
      if (recipes.length != 0) {
        return recipes;
      }
      throw new UserInputError("There are no Recipes yet.");
    },

    getOneRecipe: async (
      _: null,
      { recipeId }: { recipeId: number },
      context: { tokenBearer: string }
    ): Promise<Recipe> => {
      await authUser(context.tokenBearer);
      let recipe = await getConnection()
        .getRepository(Recipe)
        .findOne(recipeId, { relations: ["category", "user"] });
      if (recipe) {
        return recipe;
      }
      throw new UserInputError("There is no Recipe with this ID");
    },

    getMyRecipes: async (
      _: null,
      __: null,
      context: { tokenBearer: string }
    ): Promise<Recipe[]> => {
      await authUser(context.tokenBearer);
      const user = await decodeToken(context.tokenBearer);
      const recipes = await Recipe.find({
        where: { user: user },
        relations: ["user", "category"],
      });
      if (recipes.length != 0) {
        return recipes;
      }
      throw new UserInputError("This user dont have any Recipes yet.");
    },
  },
  Mutation: {
    createRecipe: async (
      _: null,
      {
        input,
      }: {
        input: {
          name: string;
          description: string;
          ingredients: string;
          categoryId: number;
        };
      },
      context: { tokenBearer: string }
    ): Promise<Recipe> => {
      await authUser(context.tokenBearer);
      let recipe = await getConnection()
        .getRepository(Recipe)
        .findOne({ where: { name: input.name } });

      if (recipe) {
        throw new UserInputError("There is a Recipe with that name already.");
      }
      let categoryCheck = (await getRepository(Category).findOne(
        input.categoryId
      )) as Category;
      if (!categoryCheck) {
        throw new UserInputError("Category not found");
      }
      const userId = await decodeToken(context.tokenBearer);
      const user = (await getRepository(User).findOne(userId)) as User;

      let newRecipe = new Recipe();
      newRecipe.name = input.name;
      newRecipe.ingredients = input.ingredients;
      newRecipe.description = input.description;
      newRecipe.category = categoryCheck;
      newRecipe.user = user;

      return await getManager().save(newRecipe);
    },

    updateRecipe: async (
      _: null,

      {
        id,
        input,
      }: {
        id: number;
        input: {
          name: string;
          description: string;
          ingredients: string;
          category: number;
        };
      },
      context: { tokenBearer: string }
    ): Promise<Recipe> => {
      await authUser(context.tokenBearer);
      let recipeToUpdate = await getConnection()
        .getRepository(Recipe)
        .findOne({ id }, { relations: ["category", "user"] });
      if (!recipeToUpdate) {
        throw new UserInputError("There is no Recipe with this ID");
      } else {
        let categoryCheck = (await getRepository(Category).findOne(
          input.category
        )) as Category;
        if (!categoryCheck) {
          throw new UserInputError("Category not found");
        }

        recipeToUpdate.name = input.name;
        recipeToUpdate.description = input.description;
        recipeToUpdate.ingredients = input.ingredients;
        recipeToUpdate.category = categoryCheck;

        let updatedRecipe = await getConnection()
          .getRepository(Recipe)
          .save(recipeToUpdate);
        return updatedRecipe;
      }
    },

    deleteRecipe: async (
      _: null,
      { recipeId }: { recipeId: number },
      context: { tokenBearer: string }
    ): Promise<Boolean> => {
      await authUser(context.tokenBearer);
      let recipe = await getConnection()
        .getRepository(Recipe)
        .findOne(recipeId, { relations: ["category", "user"] });
      if (!recipe) {
        throw new UserInputError("There is no Recipe with this ID");
      }
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Recipe)
        .where("id = :id", { id: recipeId })
        .execute();
      return true;
    },
  },
};
