// import axios from 'axios';
// import { ref } from 'vue';

// const API_BASE_URL = 'https://api-3.fly.dev';

// const useTypeDeStage = async () => {
//   const response = ref(null);
//   const error = ref(null);
//   const loading = ref(true); // Initialise loading à true


//   // Obtenir toutes les getAllInternshipTypes
//   const getAllInternshipTypes = async () => {
//     loading.value = true;
//     try {
//       response.value = await axios.get(`${API_BASE_URL}/internship-types`);
//       console.log("GET all internship-types got it", response.value.data);
//       return response.value;
//     } catch (err) {
//       error.value = err;
//       console.log("GET all internship-types erreur", err);
//     } finally {
//       loading.value = false;
//     }
//   };

//   return { getAllInternshipTypes, response, error, loading };
// }



// //test pour appeler uil marche
// // import axios from 'axios';
// // import { ref } from 'vue';

// // const API_BASE_URL = 'https://api-3.fly.dev';

// // const getAllInternshipTypes = async () => {
// //   const response = ref(null);
// //   const error = ref(null);
// //   const loading = ref(true); // Initialise loading à true

// //   try {
// //     // Fait un appel à l'API et attend la réponse
// //     response.value = await axios.get(`${API_BASE_URL}/internship-types`);
// //     console.log("GET all internship types - OK", response.value.data);
// //   } catch (err) {
// //     error.value = err;
// //     console.log("GET all internship types - ERREUR", err);
// //   } finally {
// //     loading.value = false;
// //   }

// //   return { response, error, loading };
// // };

// // // Appelle la fonction et affiche les résultats dans la console
// // getAllInternshipTypes().then(({ response, error, loading }) => {
// //   if (!error.value) {
// //     console.log(response.value.data); // Afficher les données reçues
// //   } else {
// //     console.error("Erreur lors de la récupération des types de stage: ", error.value);
// //   }
// // });

