import {Frisbee} from "../type/frisbee.ts";
import DeleteFrisbeeModal from "./DeleteFrisbeeModal.tsx";

interface FrisbeeRowProps {
    frisbee: Frisbee
    setFrisbees: (frisbees: any) => void
}

const FrisbeeRow = ({frisbee, setFrisbees}: FrisbeeRowProps) => {
    return (
        <>
            <DeleteFrisbeeModal frisbeeId={frisbee.ModelID} setFrisbees={setFrisbees} />
            <tr>
                <td>{frisbee.ModelName}</td>
                <td>{frisbee.pUHT}</td>
                <td>{frisbee.Gamme}</td>
                <td>{frisbee.Description}</td>
                <td>
                    <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={"#delete" + frisbee.ModelID}>Danger</button>
                </td>
            </tr>
        </>
    )
}

export default FrisbeeRow