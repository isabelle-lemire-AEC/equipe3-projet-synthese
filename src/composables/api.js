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

