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

import {ref} from "vue";
import axios from "axios";

//ATTENTION IL SE PEUT QUE L'OFFRE NE PUISSE RECEVROIR QU'UNE SEUL ENTREPRISE UNE ENTREPRISE UN OFFRE POUR PLUSIEURS CANDIDATS

const API_BASE_URL = "https://api-3.fly.dev";

export function useDemande() {
	const response = ref(null);
	const error = ref(null);
	const loading = ref(false);

	/* // Fonction pour l'ajout d'un candidat
	const addCandidat = async (candidatData) => {
		loading.value = true;
		try {
			response.value = await axios.post(
				`${API_BASE_URL}/candidates`,
				candidatData
			);
			console.log("candidat ajouté");
		} catch (err) {
			error.value = err;
			console.log("Le candidat n'a pas pu être ajouter", err.response.data);
		} finally {
			loading.value = false;
		}
	}; */

	/* // Fonction pour chercher un candidat par ID
	const getCandidatById = async (id) => {
		loading.value = true;
		try {
			response.value = await axios.get(
				`${API_BASE_URL}/api#/default/Candidates/${id}`
			);
			console.log("test get id");
		} catch (err) {
			error.value = err;
			console.log("get id does not work at all brotha");
		} finally {
			loading.value = false;
		}
	}; */

	// Fonction pour l'édition d'une demande de stage
	const editDemandeStage = async (id, demandeData) => {
		loading.value = true;
		try {
			response.value = await axios.patch(
				`${API_BASE_URL}/internship-requests/${id}`,
				demandeData
			);
			console.log("La demande a été modifiée");
		} catch (error) {
			error.value = error;
			console.log("Erreur : La demande n'a pu être modifiée");
		} finally {
			loading.value = false;
		}
	};

	/* // Fonction pour supprimer un candidat
	const deleteCandidat = async (id) => {
		loading.value = true;
		try {
			response.value = await axios.delete(`${API_BASE_URL}/candidates/${id}`);
			console.log("Le candidat a été supprimer avec succès");
		} catch (error) {
			error.value = error;
			console.log("Erreur : Le candidat n'a pu être supprimé");
		} finally {
			loading.value = false;
		}
	};
 */
	return {
		editDemandeStage,
		response,
		error,
		loading,
	};
}