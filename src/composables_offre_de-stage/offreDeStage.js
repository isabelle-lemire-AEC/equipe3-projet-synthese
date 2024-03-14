import { ref } from 'vue';
import axios from 'axios';

export function useInternshipOffers() {
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);

  // Ajouter une offre de stage
  const ajouterOffre = async (offerData) => {
    loading.value = true;
    try {
      // Assurez-vous que l'URL est correcte ici, sans le fragment de Swagger "#/default/InternshipOffers"
      response.value = await axios.post('https://api-3.fly.dev/internshipOffers', offerData);
      console.log("post offer marche pas", response.value.data);
    } catch (err) {
      error.value = err;
      console.log("post offer marche pas", err);
    } finally {
      loading.value = false;
    }
  };


  // PAS TESTÉ ICI ENCORE
  // Obtenir toutes les offres de stage
  const getAllOffers = async () => {
    loading.value = true;
    try {
      response.value = await axios.get('https://api-3.fly.dev/internshipOffers');
      console.log("get offer ca marche", response.value.data);
    } catch (err) {
      error.value = err;
      console.log("get offer ca marche pas", err);
    } finally {
      loading.value = false;
    }
  };
     // PAS TESTÉ ICI ENCORE
  // Mettre à jour une offre de stage
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

  return {ajouterOffre, getAllOffers, edditerOffre, response, error, loading };
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