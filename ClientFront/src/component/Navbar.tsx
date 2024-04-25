import React from 'react';

interface NavbarProps {
    isLogged: boolean;
    isAdmin: boolean; // Ajout de cette ligne
    setIsLogged: (isLogged: boolean) => void;
}

const Navbar = ({ isLogged, isAdmin, setIsLogged }: NavbarProps) => {

    const logout = () => {
        localStorage.removeItem('JWT_auth_KillerBee');
        setIsLogged(false);
        // Si vous avez un état isAdmin dans App.tsx, vous devez également le réinitialiser ici
        // setIsAdmin(false); // Ajoutez cette fonction si elle existe dans votre composant App
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">KillerBee</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {isLogged ? (
                                <>
                                    {isAdmin && (
                                        <li className="nav-item">
                                            {/* Le bouton pour créer des comptes visible seulement pour l'admin */}
                                            <button type="button" className="btn btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#register">Créer un compte</button>
                                        </li>
                                    )}
                                    <div className="d-flex" role="search">
                                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                    </div>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-outline-primary ms-2" onClick={logout}>Se déconnecter</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#login">Se connecter</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
