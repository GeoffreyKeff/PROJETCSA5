import React, {useState} from "react";
import axios from "axios";


interface LoginModalProps {
    setIsLogged: (isLogged: boolean) => void
}

const LoginModal = ({setIsLogged}: LoginModalProps) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [incorrectEmail, setIncorrectEmail] = useState(false)
    const [incorrectPwd, setIncorrectPwd] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            const user = (await axios.get(import.meta.env.VITE_URL_MS_USER + '/getUser', {params: {username: username}})).data.response
            if (!user) {
                setIncorrectEmail(true)
            } else {
                await axios.post(import.meta.env.VITE_URL_MS_USER + '/checkUserPassword', null, {
                    params: {
                        username: username,
                        password: password
                    }
                })
                const token = (await axios.post(import.meta.env.VITE_URL_MS_AUTH + '/create', null, {
                    params: {
                        userId: user.UserId,
                        username: username,
                    }
                })).data.token
                await axios.post(import.meta.env.VITE_URL_MS_USER + '/addTokenToUser', null, {
                    params: {
                        username: username,
                        token: token
                    }
                })
                localStorage.removeItem('JWT_auth_KillerBee');
                localStorage.setItem('JWT_auth_KillerBee', token)
                setUsername('')
                setPassword('')
                setIsLogged(true)
            }
        } catch (error) {
            console.log(error);
            if ((error as any).response.status === 401) {
                setIncorrectPwd(true)
            }
        }
    }

    return (
        <>
            <div className="modal fade" id="login" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Se connecter</h1>
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
                                    {incorrectEmail && <p>Indentifiant inconnu</p>}
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
                                    {incorrectPwd && <p>Mot de passe incorrect</p>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler
                                </button>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}
                                        data-bs-toggle="modal"
                                >
                                    Se connecter
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginModal