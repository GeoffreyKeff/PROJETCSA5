import axios from "axios";
import {useState} from "react";

const RegisterModal = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (username === '' || password === '') {
            return
        }
        axios.post(import.meta.env.VITE_URL_MS_USER + '/create',
            null,{
                params: {
                    username: username,
                    password: password,
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        setUsername('')
        setPassword('')
    }

    return (
        <>
            <div className="modal fade" id="register" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Créer un compte</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Saisissez votre nom d'utilisateur"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Saisissez votre mot de passe"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler
                                </button>
                                <button type="submit" className="btn btn-primary" data-bs-toggle="modal" onClick={handleSubmit}>Créer un compte</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterModal