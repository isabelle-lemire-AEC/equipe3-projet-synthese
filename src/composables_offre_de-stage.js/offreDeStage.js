import { ref } from 'vue';
import axios from 'axios';

export function useInternshipOffers() {
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);

  // Ajouter une offre de stage
  const ajouterUnOffre = async (offerData) => {
    loading.value = true;
    try {
      response.value = await axios.post('https://api-3.fly.dev/api#/default/InternshipOffers', offerData);
      console.log("Offre joutée");
    } catch (err) {
      error.value = err;
      console.log("offre ajout erreur");
    } finally {
      loading.value = false;
    }
  };

  // Obtenir toutes les offres de stage
//   const getAllOffers = async () => {
//     loading.value = true;
//     try {
//       response.value = await axios.get('https://api-3.fly.dev/internshipOffers');
//       console.log("Success: Offers fetched");
//     } catch (err) {
//       error.value = err;
//       console.log("Error: Failed to fetch offers");
//     } finally {
//       loading.value = false;
//     }
//   };

//   // Mettre à jour une offre de stage
//   const updateOffer = async (offerId, offerData) => {
//     loading.value = true;
//     try {
//       response.value = await axios.patch(`https://api-3.fly.dev/internshipOffers/${offerId}`, offerData);
//       console.log("Success: Offer updated");
//     } catch (err) {
//       error.value = err;
//       console.log("Error: Failed to update offer");
//     } finally {
//       loading.value = false;
//     }
//   };

  return { ajouterUnOffre, getAllOffers, updateOffer, response, error, loading };
}
