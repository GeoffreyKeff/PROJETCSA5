import { PrismaClient } from '@prisma/client';
import { FreezeBeeModel } from '../interfaces/frisbee';

const prisma = new PrismaClient();

async function createFreezeBeeModel(frisbeeModel: FreezeBeeModel) {
    const createdModel = await prisma.freezeBeeModel.create({
        data: {
            ModelName: frisbeeModel.ModelName,
            pUHT: frisbeeModel.pUHT,
            Gamme: frisbeeModel.Gamme,
            Description: frisbeeModel.Description,
        },
    });
    return createdModel;
}

async function getAllFreezeBeeModels() {
    const models = await prisma.freezeBeeModel.findMany();
    return models;
}

async function updateFreezeBeeModel(frisbeeModel: FreezeBeeModel) {
    const updatedModel = await prisma.freezeBeeModel.update({
        where: {
            ModelID: frisbeeModel.ModelID,
        },
        data: {
            ModelName: frisbeeModel.ModelName,
            Description: frisbeeModel.Description,
        },
    });
    return updatedModel;
}

async function deleteFreezeBeeModel(modelIdToDelete: number) {
    const deletedModel = await prisma.freezeBeeModel.delete({
        where: {
            ModelID: modelIdToDelete,
        },
    });
    return deletedModel;
}

export { deleteFreezeBeeModel, createFreezeBeeModel, getAllFreezeBeeModels, updateFreezeBeeModel };