// Assurez-vous d'importer les composants et les hooks nécessaires
import React, { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import LoginModal from './component/LoginModal';
import RegisterModal from './component/RegisterModal';
import FrisbeeTable from './component/FrisbeeTable';
import CreateFrisbeeModal from './component/CreateFrisbeeModal';
import axios from 'axios';
import setAuthTokenHeader from './modules/SetToken';
import { IsLogged } from './modules/IsLogged';
import { Frisbee } from './type/frisbee';

function App() {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Vous devez vérifier cet état au démarrage de l'application
    const [frisbees, setFrisbees] = useState<Frisbee[]>([]);
  
    useEffect(() => {
      const token = localStorage.getItem('JWT_auth_KillerBee');
      const adminStatus = localStorage.getItem('isAdmin') === 'true'; // Récupérer l'état administrateur depuis le stockage local
  
      if (token) {
        setAuthTokenHeader(token);
        IsLogged().then((logged) => {
          setIsLogged(logged as boolean);
          setIsAdmin(adminStatus); // Utiliser l'état administrateur récupéré du stockage local
        });
      } else {
        setIsLogged(false);
        setIsAdmin(false); // Assurer la réinitialisation si pas de token
      }
  
      axios.get(import.meta.env.VITE_URL_MS_FRISBEE + '/getAllFreezeBeeModels')
        .then((response) => {
          setFrisbees(response.data.response);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    const handleLoginSuccess = (username, token) => {
      setIsLogged(true);
      localStorage.setItem('JWT_auth_KillerBee', token);
      const adminState = username === 'Admin';
      setIsAdmin(adminState);
      localStorage.setItem('isAdmin', adminState.toString()); // Enregistrer l'état administrateur dans le stockage local
    };
  
    return (
      <>
        <Navbar isLogged={isLogged} isAdmin={isAdmin} setIsLogged={setIsLogged} />
        <LoginModal onLoginSuccess={handleLoginSuccess} />
        {isAdmin && <RegisterModal />}
        {isAdmin && <CreateFrisbeeModal setFrisbees={setFrisbees} />}
        <div className="container pt-4">
          {isAdmin && (
            <button type="button" className="btn btn-outline-warning mb-4" data-bs-toggle="modal" data-bs-target="#create">Ajouter un frisbee</button>
          )}
          <FrisbeeTable frisbees={frisbees} setFrisbees={setFrisbees} />
        </div>
      </>
    );
  }
  
  export default App;