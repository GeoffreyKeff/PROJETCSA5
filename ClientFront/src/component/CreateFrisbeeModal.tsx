import {useState} from "react";
import axios from "axios";


interface CreateFrisbeeModalProps {
    setFrisbees: (frisbees: any) => void
}
const CreateFrisbeeModal = ({setFrisbees}: CreateFrisbeeModalProps) => {

    const [modelName, setModelName] = useState('');
    const [pUHT, setPUHT] = useState(0);
    const [gamme, setGamme] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            await axios.post(import.meta.env.VITE_URL_MS_FRISBEE + '/createFreezeBeeModel', null, {
                params: {
                    modelName: modelName,
                    pUHT: pUHT,
                    gamme: gamme,
                    description: description
                }
            })
            setModelName('')
            setPUHT(0)
            setGamme('')
            setDescription('')
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
            <div className="modal fade" id="create" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Ajouter un frisbee</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="ModelName">Nom du modèle</label>
                                    <input
                                        value={modelName}
                                        onChange={e => setModelName(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="ModelName"
                                        name="ModelName"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pUHT">pUHT</label>
                                    <input
                                        value={pUHT}
                                        onChange={e => setPUHT(parseInt(e.target.value))}
                                        type="number"
                                        className="form-control"
                                        id="pUHT"
                                        name="pUHT"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Gamme">Gamme</label>
                                    <input
                                        value={gamme}
                                        onChange={e => setGamme(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="Gamme"
                                        name="Gamme"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Description">Description</label>
                                    <textarea
                                        onChange={e => setDescription(e.target.value)}
                                        className="form-control"
                                        id="Description"
                                        name="Description"
                                        /* @ts-ignore */
                                        rows="4"
                                    >
                                        {description}
                                    </textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler
                                </button>
                                <button type="submit" className="btn btn-primary"
                                        data-bs-toggle="modal"
                                        onClick={handleSubmit}
                                >
                                    Ajouter un frisbee
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateFrisbeeModal