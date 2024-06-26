import { ref } from 'vue';
import axios from 'axios';

const API_BASE_URL = 'https://api-3.fly.dev';

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

  const supprimerOffre = async (id) => {
    loading.value = true;
    try {
      await axios.delete(`https://api-3.fly.dev/internship-offers/${id}`);
      console.log("Suppression réussie de l'offre");
      // Vous pouvez ici mettre à jour votre état local ou effectuer une action supplémentaire après la suppression réussie.
    } catch (err) {
      error.value = err;
      console.error("Échec de la suppression de l'offre", err);
    } finally {
      loading.value = false;
    }
  };
  

  const getAllOffers = async () => {
    loading.value = true;
    try {
      const response = await axios.get('https://api-3.fly.dev/internship-offers');
      console.log("GET ALL - Offres de stage - OK", response.data);
      return response.data; 
    } catch (err) {
      error.value = err;
      console.log("GET ALL - Offres de stage - ERREUR", err);
    } finally {
      loading.value = false;
    }
  };

  const edditerOffre = async (id, offerData) => {
    // loading.value = true;
    try {
        console.log("Edition avant", offerData);
        const url = `https://api-3.fly.dev/internship-offers/${id}`; 
        const response = await axios.patch(url, offerData);
        console.log("Edition réussie", response.data);
    } catch (err) {
        error.value = err;
        console.error("Échec de l'édition", err);
    } finally {
        // loading.value = false;
    }
};
  
const getInternshipOfferById = async (id) => {
  loading.value = true;
  try {
    const res = await axios.get(`https://api-3.fly.dev/internship-offers/${id}`);
    console.log("Success: Obtained internship offer by ID", res.data);
    response.value = res.data;
  } catch (err) {
    console.error("Error: Failed to obtain internship offer by ID", err);
    error.value = err;
  } finally {
    loading.value = false;
  }
};
  
const getInternshipOfferCount = async () => {
  try {
    const response = await axios.get(`https://api-3.fly.dev/internship-offers/count`);
    console.log("GET COUNT - Offres de stage - OK", response.data);
    return response.data;
  } catch (err) {
    console.error("GET COUNT - Offres de stage - ERREUR", err);
    error.value = err;
  }
};

const activateOffer = async (id) => {
  loading.value = true;
  try {
    const response = await axios.get(`${API_BASE_URL}/internship-offers/${id}`);
    response.data.isActive = !response.data.isActive;
    await edditerOffre(id, response.data);
    console.log("ACTIVATE - Offre de stage non active - OK", response.data);
  } catch (err) {
    error.value = err;
    console.log("ACTIVATE - Offre de stage non active - ERREUR", err);
  } finally {
    loading.value = false;
  }

};

const getAllNotActiveOffers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/internship-offers`);
    console.log("GET ALL - Offres de stage non active - OK", response.data);
    const nonActiveOffers = response.data.filter(offer => offer.isActive === false);
    return nonActiveOffers;
  } catch (err) {
    error.value = err;
    console.log("GET ALL - Demandes de stage non active - ERREUR", err);
  } finally {
    loading.value = false;
  }
};

  return {ajouterOffre, getAllOffers, getInternshipOfferById, edditerOffre, supprimerOffre, getInternshipOfferCount, activateOffer, getAllNotActiveOffers, response, error, loading };
}

// Ex d'importation les amis   IMPORT
// A reverifier***

// import { useInternshipOffers } from './useInternshipOffers';

// const { ajouterOffre } = useInternshipOffers();

// const offerData = {
//   // les données icitee
// };

// addInternshipOffer(offerData).then(() => {
//   console.log('CA MARCHE !');
// }).catch((error) => {
//   console.error('CA MARCHE PAS:', error);
// });