import { ref } from 'vue';
import axios from 'axios';

export function useCandidat() {
 const response = ref(null);
 const error = ref(null);
 const loading = ref(false);

 // ici c'est pour les post
 const addCandidat = async (candidatData) => {
    loading.value = true;
    try {
        response.value = await axios.post('https://api-3.fly.dev/candidates', candidatData);
        console.log("Ca rock bro post work");
    }
    catch (err) {
        error.value = err;
        console.log("post does not work at all brotha");
    }
    finally{
        loading.value = false;
    }
 }
 //c'est pour le get by id
const getCandidatById = async (id) => {
loading.value = true;
try{
    response.value = await axios.get('https://api-3.fly.dev/api#/default/Candidates/${id}');
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
//ici C'est pour edit
const editCandidat = async (id, candidatData) => {
    loading.value = true;
    try {
      response.value = await axios.patch('https://api-3.fly.dev/candidates/${id}', candidatData);
      console.log("Success: Candidate edited");
    } catch (error) {
      error.value = error;
      console.log("Error: Failed to edit candidate");
    } finally {
      loading.value = false;
    }
  };

  const deleteCandidat = async (id) => {
    loading.value = true;
    try {
      response.value = await axios.delete(`https://api-3.fly.dev/candidates/${id}`);
      console.log("Success: Candidate deleted");
    } catch (error) {
      error.value = error;
      console.log("Error: Failed to delete candidate");
    } finally {
      loading.value = false;
    }
  };

  return { addCandidat, getCandidatById, editCandidat, deleteCandidat, response, error, loading };
}
