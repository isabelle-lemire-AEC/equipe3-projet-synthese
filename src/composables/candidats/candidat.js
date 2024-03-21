import { ref } from 'vue';
import axios from 'axios';

//ATTENTION IL SE PEUT QUE L'OFFRE NE PUISSE RECEVROIR QU'UNE SEUL ENTREPRISE UNE ENTREPRISE UN OFFRE POUR PLUSIEURS CANDIDATS

const API_BASE_URL = 'https://api-3.fly.dev';

export function useCandidat() {
  const response = ref(null); 
  const error = ref(null);
  const loading = ref(false);


  // GET tous les candidats - JO
  const getAllCandidats = async () => {
    try {
        response.value = await axios.get(`${API_BASE_URL}/candidates`);
        // console.log("Appel réussi pour récupérer tous les candidats", response.value.data);
        return response.value;
    } catch (error) {
        console.error("Erreur lors de la récupération de tous les candidats :", error);
        throw new Error("Erreur lors de la récupération de tous les candidats");
    }
  };  

  // GET un candidat par ID - ISA
  const getCandidatById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/candidates/${id}`);
        console.log("Appel réussi pour récupérer le candidat par ID");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du candidat par ID :", error);
        throw new Error("Erreur lors de la récupération du candidat par ID");
    }
  };  

  // AJOUT d'un candidat
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


  // ÉDITION d'un candidat
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

  // SUPPRIMER un candidat
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

    // Fonction pour chercher un candidat par ID - RAPH
  //const getCandidatById = async (id) => {
    //loading.value = true;
    //try{
        //response.value = await axios.get(`${API_BASE_URL}/api#/default/Candidates/${id}`);
        //console.log("test get id");
        //return response.data;
    //}
    //catch (err) {
        //error.value = err;
        //console.log("get id does not work at all brotha");
    //}
    //finally{
        //loading.value = false;
    //}
  //};

  return { addCandidat, getCandidatById, getAllCandidats, editCandidat, deleteCandidat, response, error, loading };
}
