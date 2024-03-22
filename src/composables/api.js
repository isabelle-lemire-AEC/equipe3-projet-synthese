import axios from 'axios';

const API_BASE_URL = 'https://api-3.fly.dev';

export async function fetchProvinces() {
    try {
        const response = await axios.get(`${API_BASE_URL}/provinces`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des provinces :", error);
        throw error;
    }
}

export async function fetchStageTypes() {
    try {
        const response = await axios.get(`${API_BASE_URL}/internship-types`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des type de stage :", error);
        throw error;
    }
}


// function pour tester si fetchStageTypes marche bien 
// async function displayStageTypes() {
//     try {
//         const stageTypes = await fetchStageTypes();
//         console.log(stageTypes);
//     } catch (error) {
//         console.error("Erreur lors de l'affichage des types de stage :", error);
//     }
// }

// displayStageTypes();


