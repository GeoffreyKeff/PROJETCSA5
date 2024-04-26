// Assurez-vous d'importer les composants et les hooks nécessaires
import React, { useEffect, useState } from 'react';
import Navbar from './component/Navbar';
import LoginModal from './component/LoginModal';
import RegisterModal from './component/RegisterModal';
import FrisbeeTable from './component/FrisbeeTable';
import CreateFrisbeeModal from './component/CreateFrisbeeModal';
import IngredientTable from './component/IngredientTable';
import CreateIngredientModal from './component/CreateIngredientModal';
import axios from 'axios';
import setAuthTokenHeader from './modules/SetToken';
import { IsLogged } from './modules/IsLogged';
import { Frisbee } from './type/frisbee';
import { Ingredient } from './type/ingredient';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Vous devez vérifier cet état au démarrage de l'application
  const [frisbees, setFrisbees] = useState<Frisbee[]>([]);
  const [ingredient, setIngredients] = useState<Ingredient[]>([]);

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

    axios.get(import.meta.env.VITE_URL_MS_INGREDIENT + '/getAllIngredientModels')
      .then((response) => {
        setIngredients(response.data.response);
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
      {isAdmin && <CreateIngredientModal setIngredients={setIngredients} />}
      <div className="container pt-4">
        {isAdmin && (
          <>
            <button type="button" className="btn btn-outline-warning mb-4" data-bs-toggle="modal" data-bs-target="#createFrisbeeModal">Ajouter un frisbee</button>
            <button type="button" className="btn btn-outline-warning mb-4" data-bs-toggle="modal" data-bs-target="#createIngredientModal">Ajouter un ingrédient</button>
          </>
        )}
        <FrisbeeTable frisbees={frisbees} setFrisbees={setFrisbees} />
        <IngredientTable Ingredients={ingredient} setIngredients={setIngredients} />
      </div>
    </>
  );
}

export default App;