import { useState } from "react";
import axios from "axios";

interface CreateIngredientModalProps {
    setIngredients: (ingredients: any) => void;
}

const CreateIngredientModal = ({ setIngredients }: CreateIngredientModalProps) => {
    const [ingredientName, setIngredientName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prévenir le comportement par défaut de soumission de formulaire
        try {
            const response = await axios.post(import.meta.env.VITE_URL_MS_INGREDIENT + '/createIngredientModel', {
                ingredientName: ingredientName,
                description: description
            });
            // Actualiser les données après succès
            setIngredientName('');
            setDescription('');
            refreshIngredients();
        } catch (error) {
            console.error(error);
        }
    };

    const refreshIngredients = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_URL_MS_INGREDIENT + '/getAllIngredientModels');
            setIngredients(response.data.response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="modal fade" id="createIngredientModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ajouter un ingrédient</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="ingredientName" className="form-label">Nom de l'ingrédient</label>
                                    <input type="text" className="form-control" id="ingredientName" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" required></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button type="submit" className="btn btn-primary">Ajouter</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateIngredientModal;
