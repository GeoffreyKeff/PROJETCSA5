import express from 'express';
import { createIngredientModel, getAllIngredientModels, updateIngredientModel, deleteIngredientModel } from '../modules/ingredient';
import { IngredientModel } from '../interfaces/ingredient';


import MessageResponse from '../interfaces/MessageResponse';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.status(200).json({ message: 'frisbee route' });
});


/**
 * Récupère tous les modèles FreezeBee.
 */
router.get('/getAllIngredientModels', async (req, res, next) => {
  try {
    const models = await getAllIngredientModels();
    res.status(200).json({ response: models });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Crée un nouveau modèle FreezeBee.
 */
router.post('/createIngredientModel', async (req, res, next) => {
  const { IngredientName, description } = req.query;

  const newModel: IngredientModel = {
    IngredientName: IngredientName as string,
    Description: description as string,
  };

  try {
    const createdModel = await createIngredientModel(newModel);
    res.status(200).json({ response: createdModel });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Met à jour un modèle FreezeBee.
 */
router.patch('/updateIngredientModel', async (req, res, next) => {
  const { IngredientID, IngredientName, Description  } = req.query;

  const updatedModel: IngredientModel = {
    IngredientID: parseInt(IngredientID as string),
    IngredientName: IngredientName as string,
    Description: Description as string,
  };

  try {
    const updated = await updateIngredientModel(updatedModel);
    res.status(200).json({ response: updated });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

/**
 * Supprime un modèle FreezeBee.
 */
router.delete('/deleteIngredientModel', async (req, res, next) => {
  const { IngredientID } = req.query;

  try {
    await deleteIngredientModel(parseInt(IngredientID as string));
    res.status(200).json({ response: 'Model deleted' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;