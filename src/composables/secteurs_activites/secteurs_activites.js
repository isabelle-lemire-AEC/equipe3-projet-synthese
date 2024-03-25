import { ref } from 'vue';
import axios from 'axios';

const API_BASE_URL = 'https://api-3.fly.dev';

export function useActivitySectors() {
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const getAllActivitySectors = async () => {
    loading.value = true;
    try {
      response.value = await axios.get(`${API_BASE_URL}/activity-sectors`);
      console.log("GET ALL - Secteurs d'activités - OK", response.value.data);
      return response.value.data;
    } catch (err) {
      error.value = err;
      console.log("GET ALL - Secteurs d'activités - ERREUR", err);
    } finally {
      loading.value = false;
    }
  };

  return { getAllActivitySectors, response, error, loading };
}