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
//raph
export async function fetchStageTypes() {
    try {
        const response = await axios.get(`${API_BASE_URL}/internship-types`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des type de stage :", error);
        throw error;
    }
}
//raph
export async function fetchInternshipOffers() {
    try {
        const response = await axios.get(`${API_BASE_URL}/internship-offers`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des internship-offers :", error);
        throw error;
    }
}
//raph
export async function getAllEntreprises() {
    try {
        const response = await axios.get(`${API_BASE_URL}/enterprises`);
        console.log("GET ALL - Entreprises - OK");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des enterprises :", error);
        throw error;
    }
}