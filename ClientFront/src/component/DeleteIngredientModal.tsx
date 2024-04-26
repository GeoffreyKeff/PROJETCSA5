import axios from "axios";

interface DeleteIngredientModalProps {
    ingredientId: number
    setIngredients: (ingredients: any) => void
}

const DeleteIngredientModal = ({ingredientId, setIngredients}: DeleteIngredientModalProps) => {

    const handleDelete = async (ingredientId: number) => {
        try {
            await axios.delete(import.meta.env.VITE_URL_MS_INGREDIENT + '/deleteIngredientModel', {params: {ModelID: ingredientId}})

            axios.get(import.meta.env.VITE_URL_MS_INGREDIENT + '/getAllIngredientModels').then((response) => {
                setIngredients(response.data.response);
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="modal fade" id={"delete" + ingredientId} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Supprimer un ingredient</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Voulez-vous vraiment supprimer ce ingredient ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler
                            </button>
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={() => handleDelete(ingredientId)}>
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteIngredientModal