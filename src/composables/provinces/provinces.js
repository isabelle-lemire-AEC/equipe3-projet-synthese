import { ref } from 'vue';
import axios from 'axios';

const API_BASE_URL = 'https://api-3.fly.dev';

export function useProvinces() {
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);

  // Obtenir toutes les provinces
  const getAllProvinces = async () => {
    loading.value = true;
    try {
      response.value = await axios.get(`${API_BASE_URL}/provinces`);
      console.log("GET all Province - OK", response.value.data);
      return response.value;
    } catch (err) {
      error.value = err;
      console.log("GET all Provinces - ERREUR", err);
    } finally {
      loading.value = false;
    }
  };

  // Obtenir toutes les provinces
  const getProvinceById = async (id) => {
    loading.value = true;
    try {
      response.value = await axios.get(`${API_BASE_URL}/provinces/${id}`);
      console.log("GET BY ID - Province - OK", response.value.data);
      return response.value.data;
    } catch (err) {
      error.value = err;
      console.log("GET BY ID - Province - ERREUR", err);
    } finally {
      loading.value = false;
    }
  };

  return { getAllProvinces, getProvinceById, response, error, loading };
}