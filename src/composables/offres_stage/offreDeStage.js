import { ref } from 'vue';
import axios from 'axios';

export function useInternshipOffers() {
  const response = ref([]);
  const error = ref(null);
  const loading = ref(false);

  // Ajouter une offre de stage
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
      response.value = res.data; // Mettre à jour la référence réactive avec les données récupérées
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
      response.value = await axios.patch(`https://api-3.fly.dev/internshipOffers/${id}`, offerData);
      console.log("Edition work", response.value.data);
    } catch (err) {
      error.value = err;
      console.log("Edition work pas!", err);
    } finally {
      loading.value = false;
    }
  };


// Dans useInternshipOffers composable
const getInternshipOfferById = async (id) => {
  try {
    const res = await axios.get(`https://api-3.fly.dev/internship-offers/${id}`);
    console.log("Success: Obtained internship offer by ID", res.data);
    // Mise à jour de la réponse au niveau supérieur
    response.value = [res.data]; // Mettez les données dans un tableau pour rester cohérent avec votre structure actuelle
  } catch (err) {
    console.error("Error: Failed to obtain internship offer by ID", err);
    error.value = err;
  }
};


// Remplace "65ecd2360321b1c87f2b6325" par l'ID réel de l'offre de stage que tu souhaites récupérer
// getInternshipOfferById("65ecd2360321b1c87f2b6325");


  return {ajouterOffre, getAllOffers, getInternshipOfferById, edditerOffre, response, error, loading };
}


// getAllOffers()
// console.log


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

// getAllOffers()