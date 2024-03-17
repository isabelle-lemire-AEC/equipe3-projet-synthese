import { ref } from 'vue';
import axios from 'axios';

//ATTENTION IL SE PEUT QUE L'OFFRE NE PUISSE RECEVROIR QU'UNE SEUL ENTREPRISE UNE ENTREPRISE UN OFFRE POUR PLUSIEURS CANDIDATS

const API_BASE_URL = 'https://api-3.fly.dev';

export function useCandidat() {
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);

  // Fonction pour l'ajout d'un candidat
  const addCandidat = async (candidatData) => {
    loading.value = true;
    try {
        response.value = await axios.post(`${API_BASE_URL}/candidates`, candidatData);
        console.log("candidat ajouté");
    }
    catch (err) {
        error.value = err;
        console.log("Le candidat n'a pas pu être ajouter", err.response.data);
    }
    finally{
        loading.value = false;
    }
  }

  // Fonction pour chercher un candidat par ID
  const getCandidatById = async (id) => {
    loading.value = true;
    try{
        response.value = await axios.get(`${API_BASE_URL}/api#/default/Candidates/${id}`);
        console.log("test get id");
    }
    catch (err) {
        error.value = err;
        console.log("get id does not work at all brotha");
    }

    finally{
        loading.value = false;
    }
  }

  // Fonction pour l'édition d'un candidat
  const editCandidat = async (id, candidatData) => {
    loading.value = true;
    try {
      response.value = await axios.patch(`${API_BASE_URL}/candidates/${id}`, candidatData);
      console.log("Le candidat a été modifier");
    } catch (error) {
      error.value = error;
      console.log("Erreur : Le candidat n'a pu être modifié");
    } finally {
      loading.value = false;
    }
  };

  // Fonction pour supprimer un candidat
  const deleteCandidat = async (id) => {
    loading.value = true;
    try {
      response.value = await axios.delete(`${API_BASE_URL}/candidates/${id}`);
      console.log("Le candidat a été supprimer avec succès");
    } catch (error) {
      error.value = error;
      console.log("Erreur : Le candidat n'a pu être supprimé");
    } finally {
      loading.value = false;
    }
  };

  return { addCandidat, getCandidatById, editCandidat, deleteCandidat, response, error, loading };
}
