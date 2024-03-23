import { ref } from 'vue';
import axios from 'axios';

export function useInternshipOffers() {
  const response = ref([]);
  const error = ref(null);
  const loading = ref(false);

  const ajouterOffre = async (offerData) => {
    loading.value = true;
    try {
    
      response.value = await axios.post('https://api-3.fly.dev/internship-offers', offerData);
      console.log("post offer marche", response.value.data);
    } catch (err) {
      error.value = err;
      console.log("post offer marche pas", err);
    } finally {
      loading.value = false;
    }
  };

  const getAllOffers = async () => {
    loading.value = true;
    try {
      const res = await axios.get('https://api-3.fly.dev/internship-offers');
      response.value = res.data; 
      console.log("get offer ça marche", res.data);
    } catch (err) {
      error.value = err;
      console.log("get offer ça marche pas", err);
    } finally {
      loading.value = false;
    }
  };

  const edditerOffre = async (id, offerData) => {
    loading.value = true;
    try {
        const url = `https://api-3.fly.dev/internship-offers/${id}`; 
        response.value = await axios.patch(url, offerData);
        console.log("Edition réussie", response.value.data);
    } catch (err) {
        error.value = err;
        console.error("Échec de l'édition", err);
    } finally {
        loading.value = false;
    }
};
  
const getInternshipOfferById = async (id) => {
  try {
    const res = await axios.get(`https://api-3.fly.dev/internship-offers/${id}`);
    console.log("Success: Obtained internship offer by ID", res.data);
    response.value = [res.data];
  } catch (err) {
    console.error("Error: Failed to obtain internship offer by ID", err);
    error.value = err;
  }
};

  return {ajouterOffre, getAllOffers, getInternshipOfferById, edditerOffre, response, error, loading };
}
