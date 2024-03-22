// getEntrepriseTest.js
// import axios from 'axios';
// import { ref } from 'vue';

// export function useGetEntreprise() {
//   const response = ref(null);
//   const error = ref(null);
//   const loading = ref(false);

//   const getEntrepriseById = async (id) => {
//     loading.value = true;
//     try {
//       const res = await axios.get(`https://api-3.fly.dev/enterprises/${id}`);
//       response.value = res.data;
//       console.log("Success: Entreprise data retrieved", response.value);
//     } catch (err) {
//       error.value = err;
//       console.error("Error: Failed to retrieve entreprise data", error.value);
//     } finally {
//       loading.value = false;
//     }
//   };

//   return { getEntrepriseById, response, error, loading };
// }

// Exemple d'utilisation
// const { getEntrepriseById } = useGetEntreprise();
// const entrepriseId = '65f27c246b6b31ec79d74019'; // L'ID de l'entreprise à récupérer
// getEntrepriseById(entrepriseId);

import axios from 'axios';
import { ref } from 'vue';

export function useGetAllEntreprises() {
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const getAllEntreprises = async () => {
    loading.value = true;
    try {
      const res = await axios.get('https://api-3.fly.dev/enterprises');
      response.value = res.data;
      console.log("Got all enterprises successfully", response.value);
    } catch (err) {
      error.value = err;
      console.error("Failed to get enterprises", error.value);
    } finally {
      loading.value = false;
    }
  };

  return { getAllEntreprises, response, error, loading };
}

// Exemple d'utilisation
const { getAllEntreprises } = useGetAllEntreprises();
getAllEntreprises();
