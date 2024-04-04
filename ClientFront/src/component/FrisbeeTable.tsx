import {Frisbee} from "../type/frisbee.ts";
import FrisbeeRow from "./FrisbeeRow.tsx";

interface FrisbeeTableProps {
    frisbees: Frisbee[]
    setFrisbees: (frisbees: any) => void
}

const FrisbeeTable = ({frisbees, setFrisbees}: FrisbeeTableProps) => {
    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Model name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Gamme</th>
                    <th scope="col">Description</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {frisbees.map((frisbee, index) => {
                    return (
                        <FrisbeeRow
                            key={index}
                            frisbee={frisbee}
                            setFrisbees={setFrisbees}
                        />
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default FrisbeeTable