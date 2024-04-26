import {Ingredient} from "../type/ingredient.ts";
import DeleteIngredientModal from "./DeleteIngredientModal.tsx";

interface IngredientRowProps {
    ingredient: Ingredient
    setIngredients: (ingredient: any) => void
}

const IngredientRow = ({ingredient, setIngredients}: IngredientRowProps) => {
    return (
        <>
            <DeleteIngredientModal ingredientId={ingredient.IngredientID} setIngredients={setIngredients} />
            <tr>
                <td>{ingredient.IngredientName}</td>
                <td>{ingredient.Description}</td>
                <td>
                    <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={"#delete" + ingredient.IngredientID}>Supprimer</button>
                </td>
            </tr> 
        </>
    )
}

export default IngredientRow 
