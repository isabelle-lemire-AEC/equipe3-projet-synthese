import { ref } from 'vue';
import axios from 'axios';

const API_BASE_URL = 'https://api-3.fly.dev';

export function useInternshipTypes() {
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);

  // Obtenir tous les types de stage
  const getAllInternshipTypes = async () => {
    loading.value = true;
    try {
      response.value = await axios.get(`${API_BASE_URL}/internship-types`);
      console.log("GET all internship types - OK", response.value.data);
      return response.value;
    } catch (err) {
      error.value = err;
      console.log("GET all internship types - ERREUR", err);
    } finally {
      loading.value = false;
    }
  };

  return { getAllInternshipTypes, response, error, loading };
}