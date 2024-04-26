import {Ingredient} from "../type/ingredient.ts";
import IngredientRow from "./IngredientRow.tsx";

interface IngredientTableProps {
    Ingredients: Ingredient[]
    setIngredients: (Ingredients: any) => void
}

const IngredientTable = ({Ingredients, setIngredients}: IngredientTableProps) => {
    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Model name</th>
                    <th scope="col">Description</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {Ingredients.map((Ingredient, index) => {
                    return (
                        <IngredientRow
                            key={index}
                            Ingredient={Ingredient}
                            setIngredients={setIngredients}
                        />
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default IngredientTable