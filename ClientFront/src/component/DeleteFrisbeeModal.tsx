import axios from "axios";

interface DeleteFrisbeeModalProps {
    frisbeeId: number
    setFrisbees: (frisbees: any) => void
}

const DeleteFrisbeeModal = ({frisbeeId, setFrisbees}: DeleteFrisbeeModalProps) => {

    const handleDelete = async (frisbeeId: number) => {
        try {
            await axios.delete(import.meta.env.VITE_URL_MS_FRISBEE + '/deleteFreezeBeeModel', {params: {ModelID: frisbeeId}})

            axios.get(import.meta.env.VITE_URL_MS_FRISBEE + '/getAllFreezeBeeModels').then((response) => {
                setFrisbees(response.data.response);
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <div className="modal fade" id={"delete" + frisbeeId} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Supprimer un frisbee</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Voulez-vous vraiment supprimer ce frisbee ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler
                            </button>
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={() => handleDelete(frisbeeId)}>
                                Confirmer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteFrisbeeModal