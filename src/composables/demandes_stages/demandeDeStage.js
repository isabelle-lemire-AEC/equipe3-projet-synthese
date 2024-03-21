import { ref } from 'vue';
import axios from 'axios';

const API_BASE_URL = 'https://api-3.fly.dev';

export function useInternshipRequests() {
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);

  // Ajouter une demande de stage
  const addRequest = async (requestData) => {
    loading.value = true;
    try {
      response.value = await axios.post(`${API_BASE_URL}/internship-requests`, requestData);
      console.log("POST Demande de stage - OK", response.value.data);
      return response.value;
    } catch (err) {
      error.value = err;
      console.log("POST Demande de stage - ERREUR", err);
    } finally {
      loading.value = false;
    }
  };

  // Obtenir toutes les demandes de stage
  const getAllRequests = async () => {
    loading.value = true;
    try {
      response.value = await axios.get(`${API_BASE_URL}/internship-requests`);
      console.log("GET ALL Demandes de stage - OK", response.value.data);
      return response.value;
    } catch (err) {
      error.value = err;
      console.log("GET ALL Demandes de stage - ERREUR", err);
    } finally {
      loading.value = false;
    }
  };

  // Obtenir une demande de stage avec le ID
  const getRequestById = async (id) => {
    loading.value = true;
    try {
      response.value = await axios.get(`${API_BASE_URL}/internship-requests/${id}`);
      console.log("GET Demandes de stage BY ID - OK", response.value.data);
      return response.value;
    } catch (err) {
      error.value = err;
      console.log("GET Demandes de stage BY ID - ERREUR", err);
    } finally {
      loading.value = false;
    }
  };

  // Mettre à jour une demande de stage
  const editRequest = async (id, requestData) => {
    loading.value = true;
    try {
      response.value = await axios.patch(`${API_BASE_URL}/internship-requests/${id}`, requestData);
      console.log(`PATCH Demande de stage avec le id ${id} OK`, response.value.data);
      return response.value;
    } catch (err) {
      error.value = err;
      console.log(`PATCH Demande de stage avec le id ${id} ERREUR`, err);
    } finally {
      loading.value = false;
    }
  };

  return {addRequest, getAllRequests, getRequestById, editRequest, response, error, loading };
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

// Objet calide fournie par l'enseignant 

// {
//     "title": "Test Bruno",
//     "description": "Recherche un développeur front-end passionné par la création d'expériences utilisateur captivantes et l'innovation technologique.",
//     "candidate": {
//         "_id": "65f234c25343f1ed7ab81e4b",
//         "description": "Passionate web developer with a knack for creating intuitive user interfaces and improving website efficiency.",
//         "email": "jane.doe@example.com",
//         "firstName": "Jane",
//         "lastName": "Doe",
//         "address": "1234 Maple Street",
//         "phone": "514-966-4567",
//         "city": "Techville",
//         "skills": ["React", "Vue.js", "CSS"],
//         "province": {
//             "_id": "65e4dff388da6547197b1229",
//             "value": "NUNAVUT"
//         },
//         "postalCode": "K1A 0B1"
//     },
//     "startDate": "2024-04-01T00:00:00.000Z",
//     "endDate": "2024-10-31T00:00:00.000Z",
//     "weeklyWorkHours": 40,
//     "province": {
//         "_id": "65e4dff388da6547197b1229",
//         "value": "NUNAVUT"
//     },
//     "skills": ["React", "Vue.js", "CSS"],
//     "internshipType": {
//         "_id": "65e4dffb88da6547197b1233",
//         "value": "PARTIAL"
//     },
//     "additionalInformation": "DISCRETIONARY",
//     "isActive": true
// }