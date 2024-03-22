import { ref } from 'vue';
import axios from 'axios';

const apiBaseUrl = 'https://api-3.fly.dev';

export function useEntreprise() {
    const entreprises = ref([]);
    const entreprise = ref({});
    const error = ref(null);
    const loading = ref(false);

    const chargerEntreprises = async () => {
        loading.value = true;
        try {
            const response = await axios.get(`${apiBaseUrl}/enterprises`);
            entreprises.value = response.data;
        } catch (err) {
            error.value = err;
            console.error('Erreur lors de la récupération des entreprises:', err);
        } finally {
            loading.value = false;
        }
    };

    const chargerEntreprise = async (id) => {
        loading.value = true;
        try {
            const response = await axios.get(`${apiBaseUrl}/enterprises/${id}`);
            entreprise.value = response.data;
        } catch (err) {
            error.value = err;
            console.error('Erreur lors de la récupération de l\'entreprise:', err);
        } finally {
            loading.value = false;
        }
    };

    const ajouterEntreprise = async (entrepriseData) => {
        loading.value = true;
        try {
            const response = await axios.post(`${apiBaseUrl}/enterprises`, entrepriseData);
            entreprise.value = response.data;
            console.log('Entreprise ajoutée avec succès');
        } catch (err) {
            error.value = err;
            console.error('Erreur lors de l\'ajout de l\'entreprise:', err);
        } finally {
            loading.value = false;
        }
    };

    const mettreAjourEntreprise = async (id, entrepriseData) => {
        loading.value = true;
        try {
            const response = await axios.put(`${apiBaseUrl}/enterprises/${id}`, entrepriseData);
            entreprise.value = response.data;
            console.log('Entreprise mise à jour avec succès');
        } catch (err) {
            error.value = err;
            console.error('Erreur lors de la mise à jour de l\'entreprise:', err);
        } finally {
            loading.value = false;
        }
    };

    const supprimerEntreprise = async (id) => {
        loading.value = true;
        try {
            await axios.delete(`${apiBaseUrl}/enterprises/${id}`);
            console.log('Entreprise supprimée avec succès');
        } catch (err) {
            error.value = err;
            console.error('Erreur lors de la suppression de l\'entreprise:', err);
        } finally {
            loading.value = false;
        }
    };

    return {
        entreprises,
        entreprise,
        chargerEntreprises,
        chargerEntreprise,
        ajouterEntreprise,
        mettreAjourEntreprise,
        supprimerEntreprise,
        error,
        loading
    };
}
