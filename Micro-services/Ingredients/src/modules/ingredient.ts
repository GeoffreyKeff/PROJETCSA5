import { PrismaClient } from '@prisma/client';
import { IngredientModel } from '../interfaces/ingredient';

const prisma = new PrismaClient();

async function createIngredientModel(ingredientModel: IngredientModel) {
    const createdModel = await prisma.IngredientModel.create({
        data: {
            IngredientName: ingredientModel.IngredientName,
            Description: ingredientModel.Description,
        },
    });
    return createdModel;
}

async function getAllIngredientModels() {
    const models = await prisma.IngredientModel.findMany();
    return models;
}

async function updateIngredientModel(ingredientModel: IngredientModel) {
    const updatedModel = await prisma.IngredientModel.update({
        where: {
            IngredientID: ingredientModel.IngredientID,
        },
        data: {
            IngredientName: ingredientModel.IngredientName,
            Description: ingredientModel.Description,
        },
    });
    return updatedModel;
}

async function deleteIngredientModel(IngredientIDToDelete: number) {
    const deletedModel = await prisma.IngredientModel.delete({
        where: {
            IngredientID: IngredientIDToDelete,
        },
    });
    return deletedModel;
}

export { deleteIngredientModel, createIngredientModel, getAllIngredientModels, updateIngredientModel };