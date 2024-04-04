import express from 'express';
import { createFreezeBeeModel, getAllFreezeBeeModels, updateFreezeBeeModel, deleteFreezeBeeModel } from '../modules/frisbee';
import { FreezeBeeModel } from '../interfaces/frisbee';


import MessageResponse from '../interfaces/MessageResponse';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.status(200).json({ message: 'frisbee route' });
});


/**
 * Récupère tous les modèles FreezeBee.
 */
router.get('/getAllFreezeBeeModels', async (req, res, next) => {
  try {
    const models = await getAllFreezeBeeModels();
    res.status(200).json({ response: models });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Crée un nouveau modèle FreezeBee.
 */
router.post('/createFreezeBeeModel', async (req, res, next) => {
  const { modelName, pUHT, gamme, description } = req.query;

  const newModel: FreezeBeeModel = {
    ModelName: modelName as string,
    pUHT: parseFloat(pUHT as string),
    Gamme: gamme as string,
    Description: description as string,
  };

  try {
    const createdModel = await createFreezeBeeModel(newModel);
    res.status(200).json({ response: createdModel });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Met à jour un modèle FreezeBee.
 */
router.patch('/updateFreezeBeeModel', async (req, res, next) => {
  const { ModelID, ModelName, Description, Gamme, pUHT  } = req.query;

  const updatedModel: FreezeBeeModel = {
    ModelID: parseInt(ModelID as string),
    ModelName: ModelName as string,
    pUHT: pUHT as unknown as number,
    Gamme: Gamme as string,
    Description: Description as string,
  };

  try {
    const updated = await updateFreezeBeeModel(updatedModel);
    res.status(200).json({ response: updated });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Supprime un modèle FreezeBee.
 */
router.delete('/deleteFreezeBeeModel', async (req, res, next) => {
  const { ModelID } = req.query;

  try {
    await deleteFreezeBeeModel(parseInt(ModelID as string));
    res.status(200).json({ response: 'Model deleted' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;